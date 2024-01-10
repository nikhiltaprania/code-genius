// Platform section
let localStream; // Variable to store the local media stream

async function toggleVideo() {
    const localVideo = document.getElementById('local-video');

    try {
        if (!localStream) {
            // If localStream is not defined, request only audio initially
            localStream = await navigator.mediaDevices.getUserMedia({
                audio: true, video: false
            });
            localVideo.srcObject = localStream;

        } else {
            const videoTrack = localStream.getVideoTracks()[0];
            const isVideoEnabled = videoTrack ? videoTrack.enabled : false;

            if (isVideoEnabled) {
                // If video is currently enabled, stop the track
                videoTrack.stop();
            } else {
                // If video is currently disabled, request the camera and update the srcObject
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                // Replace the existing video track or add a new one
                if (videoTrack) {
                    localStream.removeTrack(videoTrack);
                }
                localStream.addTrack(newStream.getVideoTracks()[0]);
            }

            if (videoTrack) {
                videoTrack.enabled = !isVideoEnabled;
            }
        }
        document.getElementById('video-btn').textContent = localStream.getVideoTracks()[0] && localStream.getVideoTracks()[0].enabled ? 'Disable Video' : 'Enable Video';

    } catch (error) {
        console.error('Error toggling video:', error);
    }
}

async function toggleMute() {
    const localAudio = document.getElementById('local-video').srcObject.getAudioTracks()[0];

    try {
        const isMuted = localAudio.enabled;
        localAudio.enabled = !isMuted;
        document.getElementById('mute-btn').textContent = isMuted ? 'Mute' : 'Unmute';

    } catch (error) {
        console.error('Error toggling audio:', error);
    }
}

async function startMedia() {
    try {
        // Initially request only audio
        localStream = await navigator.mediaDevices.getUserMedia({
            audio: true, video: false
        });

        const localVideo = document.getElementById('local-video');
        localVideo.srcObject = localStream;
        document.getElementById('mute-btn').disabled = false;
        document.getElementById('video-btn').disabled = false;

    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

// Call the startMedia function when the page loads
window.addEventListener('load', startMedia);

// Code Genius section
async function sendMessage(userInput) {
    try {
        const encodedUserInput = encodeURIComponent(userInput);
        const url = `http://localhost:8085/bot/chat?prompt=${encodedUserInput}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.text();
        const responseContainer = document.getElementById('output');
        responseContainer.innerText = responseData;

        // Convert each sentence to speech with a delay
        const sentences = responseData.split('. ');
        await speakSentences(sentences);

    } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
    }
}

// Training to bot
async function firstPrompt() {
    let isConfirm = confirm("All the best! Do you want to start the interview ?");

    if (isConfirm) {
        document.getElementById('end-call-btn').style.display = 'none';

        let promt;
        if (techStack === "java") {
            promt = "`Interviewer Mode: Conducting JAVA BackEnd Developer Interview\n" + "\n" + "Introduction:\n" + "Imagine you are an interviewer conducting an interview for a JAVA BackEnd Developer. Your task is to ask the interviewee about their background, experience, and assess their knowledge in JavaSE, JakartaEE, and Spring Core. Start with a brief introduction and then proceed to ask at least 5 basic questions, covering a range of topics within JavaSE, JakartaEE, and Spring Core. After the questions, provide constructive feedback to the interviewee based on their responses.\n" + "\n" + "Instructions:\n" + "1. Begin by greeting the interviewee and asking them to introduce themselves briefly.\n" + "2. Ask a question related to JavaSE to evaluate their foundational knowledge.\n" + "3. Move on to a question about JakartaEE, assessing their understanding of enterprise-level Java development.\n" + "4. Pose a question related to Spring Core, focusing on their knowledge of the Spring framework.\n" + "5. Ask another question, this time returning to JavaSE but perhaps focusing on a different aspect or concept.\n" + "6. Proceed to ask a question related to JakartaEE, exploring a different aspect from the earlier question.\n" + "7. Conclude the interview by asking a final question about Spring Core, ensuring a comprehensive evaluation.\n" + "8. After the interview questions, provide feedback to the interviewee, highlighting strengths and areas for improvement based on their responses.`\n" + "\n" + "Don't provide the answers. Ask the questions from interviewee ONE BY ONE then move on. Ask me 'ARE YOU READY' to start the interview and wait for my response.\n" + "Don't go ahead until I response you";

        } else if (techStack === "javascript") {
            promt = "`Interviewer Mode: Conducting JavaScript Developer Interview\n" + "\n" + "Introduction:\n" + "Imagine you are an interviewer conducting an interview for an Advanced JavaScript Developer role. Your goal is to assess the interviewee's expertise in advanced JavaScript concepts and their ability to apply them in real-world scenarios. Begin with a brief introduction and proceed to ask at least 5 advanced questions covering a range of topics within JavaScript. After the questions, provide constructive feedback based on their responses.\n" + "\n" + "Instructions:\n" + "1. Start by welcoming the interviewee and asking them to provide a brief overview of their experience and expertise in JavaScript.\n" + "2. Pose a question related to closures in JavaScript, evaluating their understanding of this advanced concept.\n" + "3. Move on to a question about promises and asynchronous programming, assessing their knowledge of handling asynchronous tasks in JavaScript.\n" + "4. Ask a question about prototypal inheritance, exploring their understanding of how inheritance works in the context of JavaScript.\n" + "5. Inquire about the event loop and its significance in JavaScript, gauging their comprehension of the runtime environment.\n" + "6. Shift the focus to modern JavaScript features by asking about the usage of arrow functions and their differences from regular functions.\n" + "7. Explore their knowledge of ES6 features, possibly by asking about destructuring, template literals, or the spread/rest operator.\n" + "8. Conclude the interview by asking a question related to handling errors in JavaScript, checking their familiarity with error handling mechanisms.\n" + "9. After the interview questions, provide feedback to the interviewee, highlighting their strengths and suggesting areas for improvement based on their responses.`\n" + "\n" + "Don't provide the answers. Ask the questions from interviewee ONE BY ONE then move on. Ask me 'ARE YOU READY' to start the interview and wait for my response.\n" + "Don't go ahead until I response you";

        } else {
            promt = "`Interviewer Mode: Conducting Python Developer Interview\n" + "\n" + "Introduction:\n" + "Imagine you are an interviewer conducting an interview for an Advanced Python Developer role. Your objective is to assess the interviewee's proficiency in advanced Python concepts and their ability to apply them in practical scenarios. Begin with a brief introduction and then proceed to ask at least 5 advanced questions covering various topics within Python. After the questions, provide constructive feedback based on their responses.\n" + "\n" + "Instructions:\n" + "1. Begin the interview by welcoming the candidate and asking them to provide a brief overview of their experience and expertise in Python.\n" + "2. Start with a question on decorators in Python, assessing their understanding of how decorators work and their practical applications.\n" + "3. Move on to a question related to generators and how they differ from regular functions, evaluating their knowledge of Python's generator functions.\n" + "4. Inquire about context managers in Python, exploring their understanding of the with statement and its applications.\n" + "5. Ask a question about metaclasses, checking their familiarity with this advanced Python concept and its use cases.\n" + "6. Shift the focus to concurrency by asking about the Global Interpreter Lock (GIL) in Python and its impact on multi-threading.\n" + "7. Explore their knowledge of Python's built-in functions and data structures, possibly by asking about map, filter, or the collections module.\n" + "8. Conclude the interview by asking a question related to Python's memory management, checking their awareness of how Python manages memory.\n" + "9. After the interview questions, provide feedback to the interviewee, highlighting their strengths and suggesting areas for improvement based on their responses.`\n" + "\n" + "Don't provide the answers. Ask the questions from interviewee ONE BY ONE then move on. Ask me 'ARE YOU READY' to start the interview and wait for my response.\n" + "Don't go ahead until I response you";
        }

        try {
            const encodedUserInput = encodeURIComponent(promt);
            const url = `http://localhost:8085/bot/chat?prompt=${encodedUserInput}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.text();
            const responseContainer = document.getElementById('output');
            responseContainer.innerText = responseData;

            // Convert each sentence to speech with a delay
            const sentences = responseData.split('. ');
            await speakSentences(sentences);

        } catch (error) {
            console.error("Error:", error);
            alert("Error:", error);
        }
    }
}

async function speakSentences(sentences) {
    for (const sentence of sentences) {
        playRemoteVideo();
        await textToSpeech(sentence);
        stopRemoteVideo();
    }
}

function textToSpeech(text) {
    return new Promise((resolve) => {
        if ('speechSynthesis' in window) {
            // Clear existing queue
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;

            // Event listeners to track speech events
            utterance.addEventListener('start', () => {
                console.log('Speech started');
            });

            utterance.addEventListener('end', () => {
                console.log('Speech ended');
                resolve();
            });
            speechSynthesis.speak(utterance);

        } else {
            console.error('Speech Synthesis not supported in your browser.');
            resolve();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('mute-btn');
    const outputDiv = document.getElementById('output');
    let recognition;
    let isRecording = false;
    let finalTranscript = '';

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = function (event) {
            const result = event.results[event.resultIndex];
            const transcript = result[0].transcript;

            if (result.isFinal) {
                finalTranscript += transcript + ' ';
                outputDiv.innerHTML = finalTranscript;
                sendMessage(finalTranscript);
                finalTranscript = '';
            }
        };

        recognition.onend = function () {
            if (isRecording) {
                recognition.start();
            }
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
        };

        toggleBtn.addEventListener('click', function () {
            if (!isRecording) {
                finalTranscript = '';
                recognition.start();
                toggleBtn.textContent = 'Unmute';

            } else {
                recognition.stop();
                toggleBtn.textContent = 'Mute';
            }

            isRecording = !isRecording;
        });

    } else {
        alert('Speech recognition not supported in your browser. Please use a modern browser.');
    }
});

function playRemoteVideo() {
    const remoteVideo = document.getElementById('remote-video');
    remoteVideo.play();
}

function stopRemoteVideo() {
    const remoteVideo = document.getElementById('remote-video');
    remoteVideo.pause();
    remoteVideo.currentTime = 0;
}