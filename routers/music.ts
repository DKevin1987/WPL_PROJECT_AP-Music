
import express from "express";
import { bucket } from "../database";
import { Mp3_header } from "../data/interfaces";

export default function music() {

    const router = express.Router();


        router.get('/:filename', async (req, res) => {
            const filename = req.params.filename;

            const file = await bucket.find({ filename }).next();
            
            if (!file || typeof filename != "string") {
                return res.status(404).json({ error: 'File not found' });
            }

            const fileSize = file.length;
            const range    = req.headers.range;

            if (range) {
                const parts     = range.replace(/bytes=/, '').split('-')
                const start     = parseInt(parts[0])
                const end       = parts[1] ? parseInt(parts[1]) : fileSize - 1
                const chunksize = (end - start)  + 1

                if (start >= fileSize || end >= fileSize || start > end) {
                    res.status(416).set('Content-Range', `bytes */${fileSize}`)
                    return res.end();
                }

                res.set({
                    'Content-Type': 'audio/mpeg',
                    'Accept-Ranges': 'bytes',
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Content-Length': chunksize.toString()
                });

                res.status(206);

                const stream = bucket.openDownloadStreamByName(filename, { 
                    "start":start, 
                    "end":end + 1,
                });
                
                stream.pipe(res);
            } 
        // else {
        //     res.status(200);
        //     res.set('Content-Length', fileSize.toString());

        //     const stream = bucket.openDownloadStreamByName(filename);
        //     stream.pipe(res);
        // }

    });



    // router.get('/music/:filename', async (req, res) => {
    //     const filename = req.params.filename;

    //     const file = await bucket.find({ filename }).next();
        
    //     if (!file) {
    //         return res.status(404).json({ error: 'File not found' });
    //     }

    //     const fileSize = file.length;
    //     const range = req.headers.range;

    //     if (range) {
    //         const parts     = range.replace(/bytes=/, '').split('-')
    //         const start     = parseInt(parts[0])
    //         const end       = parts[1] ? parseInt(parts[1]) : fileSize - 1
    //         const chunksize = (end - start) + 1

    //         if (start >= fileSize || end >= fileSize || start > end) {
    //             res.status(416).set('Content-Range', `bytes */${fileSize}`)
    //             return res.end();
    //         }

    //         res.set({
    //             'Content-Type': 'audio/mpeg',
    //             'Accept-Ranges': 'bytes',
    //             'Cache-Control': 'no-cache, no-store, must-revalidate',
    //             'Pragma': 'no-cache',
    //             'Expires': '0',
    //             'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    //             'Content-Length': chunksize.toString()
    //         });

    //         res.status(206);

    //         const stream = bucket.openDownloadStreamByName(filename, { 
    //             start, 
    //             end: end + 1 // +1 handles the inclusive/exclusive mismatch[citation:5]
    //         });
    //         stream.pipe(res);
    //     }else{
    //         return res.status(404).send("Error ")
    //     }

    // });









//     router.get('/music/:filename', async (req, res) => {
//     const filename = req.params.filename;

//     try {
//         const file = await bucket.find({ filename }).next();
//         if (!file) return res.status(404).json({ error: 'File not found' });

//         const fileSize = file.length;
//         const range = req.headers.range;

//         // Set headers that apply to all responses
//         res.set({
//             'Content-Type': 'audio/mpeg',
//             'Accept-Ranges': 'bytes',
//             'Cache-Control': 'no-cache, no-store, must-revalidate',
//             'Pragma': 'no-cache',
//             'Expires': '0'
//         });

//         if (range) {
//             console.log("one");
//             const parts = range.replace(/bytes=/, '').split('-');
//             const start = parseInt(parts[0], 10);
//             const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//             const chunksize = (end - start) + 1;

//             if (start >= fileSize || end >= fileSize || start > end) {
//                 res.status(416).set('Content-Range', `bytes */${fileSize}`);
//                 return res.end();
//             }

//             // CRITICAL: Only send Content-Range when responding to a Range request[citation:4]
//             res.status(206);
//             res.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
//             res.set('Content-Length', chunksize.toString());

//             const stream = bucket.openDownloadStreamByName(filename, { 
//                 start, 
//                 end: end + 1 // +1 handles the inclusive/exclusive mismatch[citation:5]
//             });
//             stream.pipe(res);
//         } else {
//             // No Range header - send complete file WITHOUT Content-Range header[citation:4]
//             console.log("two");
            
//             res.status(200);
//             res.set('Content-Length', fileSize.toString());

//             const stream = bucket.openDownloadStreamByName(filename);
//             stream.pipe(res);
//         }

//     } catch (error) {
//         console.error(error);
//         if (!res.headersSent) {
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// });



    return router
}


