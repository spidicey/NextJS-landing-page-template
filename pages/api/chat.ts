// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey:
//     "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",
// });

// export default async function POST(req: Request, res: NextResponse) {
//   const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: req.body(),
//   });
//   console.log(completion.choices[0].message);
//   const theResponse = completion.choices[0].message;

//   return NextResponse.json({ output: theResponse }, { status: 200 });
// }
