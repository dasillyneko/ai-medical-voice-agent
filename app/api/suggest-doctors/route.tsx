import { NextRequest, NextResponse } from "next/server";
import {openai} from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";

export async function POST(req:NextRequest){
  const{notes}=await req.json();
    try{
      const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content: JSON.stringify(AIDoctorAgents),
          },
          {
            role: 'user',
            content: "User notes/Symptoms:"+notes+"Depends on user notes and symptoms, please suggest list of doctors, Return object in JSON only give the list of doctors only dont give it any name to the list.",
          },
        ],
      });
      const rawResp = completion.choices[0].message;
      //@ts-ignore
      const Resp=rawResp.content.trim().replace('```json', '').replace('```', '');
      const JSONResp=JSON.parse(Resp);
      return NextResponse.json(JSONResp);

    }catch(e){
      return NextResponse.json(e);
    }
}