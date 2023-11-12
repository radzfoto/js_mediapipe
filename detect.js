module.exports = function(RED) {
    function DetectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function(msg) {
            const cv = require('opencv4nodejs');
            const { Hands } = require('@mediapipe/hands');
            const hands = new Hands({
                locateFile: (file) => {
                    return `node_modules/@mediapipe/hands/${file}`;
                }
            });

            hands.onResults((results) => {
                // Draw the hand landmarks.
                if (results.multiHandLandmarks) {
                    for (const landmarks of results.multiHandLandmarks) {
                        // Draw landmarks on the frame
                        // This part needs to be implemented as per your requirement
                    }
                }
            });

            if (msg.payload === null) {
                node.send({ payload: null });
                return;
            }

            const imgBuffer = Buffer.from(msg.payload, 'base64');
            let frame = cv.imdecode(imgBuffer);

            // Convert the frame to a format suitable for MediaPipe
            // This might involve converting the frame to a different format or color space
            // Implement the conversion logic here

            // Pass the frame to MediaPipe Hands
            hands.send({ image: frame });

            // Convert the processed frame back to base64
            const jpgAsBase64 = cv.imencode('.jpg', frame).toString('base64');
            msg.payload = jpgAsBase64;

            node.send(msg);
        });
    }
    RED.nodes.registerType("detect", DetectNode);
}
