import { generateIntroductionReply } from "./services/llmService.js";

async function run() {

    const response = await generateIntroductionReply(
`Hello everyone!

I'm Shankar.

I'm a Computer Science student from India.

I enjoy AI, Machine Learning, Discord Bots and Open Source.

Happy to be here!`
    );

    console.log(response);

}

run(); 