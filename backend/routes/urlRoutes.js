const dbgr = require("debug")("app:routes:urlRoutes");
const express = require("express");
const router = express.Router();
const normalizeUrl = require("normalize-url");
const urlModel = require("../models/urlModel");
const authMiddleware = require("../middleware/authMiddleware");
const crypto = require("crypto");

const ratelimit = require("express-rate-limit");
const createLimiter = ratelimit({
    windowMs: 5 * 60 * 1000, 
    max:5,
    keyGenerator: (req) => req.user.id,
    message: "Too many requests from this IP, please try again after 5 minutes"
})


router.post("/",authMiddleware, createLimiter ,async (req, res) => {
    try {
        
        const { originalurl } = req.body;
         let normalizedUrl = normalizeUrl(originalurl, {
    stripTrailingSlash: true
});
        if (!originalurl) {
            return res.status(400).json({
                message: "Original URL is required"
            });
        } 
        console.log("Searching for:", originalurl);

        let existingUrl = await urlModel.findOne({
            originalurl:normalizedUrl
        });
       console.log("Found:", existingUrl);
        if (existingUrl) {
            return res.status(200).json({
                message: "URL already exists",
                url: {
                    id: existingUrl._id,
                    originalurl: existingUrl.originalurl,
                    shorturl: `${req.protocol}://${req.get("host")}/api/urls/${existingUrl.shorturl}`
                }
            });
        }

        const shorturl = crypto.randomBytes(4).toString("hex");

        const createdUrl = await urlModel.create({
            originalurl: normalizedUrl,
            shorturl,
            owner: req.user.id
        });

        return res.status(201).json({
            message: "URL created successfully",
            url: {
                id: createdUrl._id,
                originalurl: createdUrl.originalurl,
                shorturl: `${req.protocol}://${req.get("host")}/api/urls/${createdUrl.shorturl}`
            }
        });

    } catch (err) {

        dbgr(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
});


router.get("/myurls", authMiddleware, async (req, res) => {

    try {

        const urls = await urlModel.find({
            owner: req.user.id
        });

        res.status(200).json({
            message: "URLs retrieved successfully",
            urls: urls.map(url => ({
                id: url._id,
                originalurl: url.originalurl,
                shorturl: `${req.protocol}://${req.get("host")}/api/urls/${url.shorturl}`,
                clicks: url.clicks,
                lastVisited: url.lastVisited
            }))
        });

    } catch (err) {

        dbgr(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const deletedUrl = await urlModel.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!deletedUrl) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        res.status(200).json({
            message: "URL deleted successfully"
        });

    } catch (err) {

        dbgr(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

router.get("/:shorturl", async (req, res) => {

    try {

        const url = await urlModel.findOne({
            shorturl: req.params.shorturl
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }
        else{
          url.clicks += 1;
        url.lastVisited = new Date();
        await url.save();
        res.redirect(url.originalurl);
        }
        

    } catch (err) {

        dbgr(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

router.put("/edit/:shorturl", authMiddleware, async (req, res) => {
    try {

        const { newAlias } = req.body;

        if (!newAlias) {
            return res.status(400).json({
                message: "Alias is required"
            });
        }

        const updatedUrl =
            await urlModel.findOneAndUpdate(
                {
                    shorturl: req.params.shorturl
                },
                {
                    shorturl: newAlias
                },
                {
                    new: true
                }
            );

        if (!updatedUrl) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        res.status(200).json({
            message: "URL updated successfully",
            url: updatedUrl
        });

    } catch (err) {

        dbgr(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
});

module.exports = router;