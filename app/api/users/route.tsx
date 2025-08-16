import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const user=await currentUser();

    try{
    //Check if user exist
        const users=await db.select().from(usersTable)
        //@ts-ignore
            .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress));
        if(users?.length==0){
            const result=await db.insert(usersTable).values({
                //@ts-ignore
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
                credits:10
                //@ts-ignore
            }).returning({usersTable})
            return NextResponse.json(result[0].usersTable);
        }
        return NextResponse.json(users[0]); 
    }
    //if not create new user
    catch(e){
       return NextResponse.json(e);
    }
}

export async function GET(req: NextRequest) {
    const {searchParams}=new URL(req.url);
    const sessionId=searchParams.get('sessionId');
    const user=await currentUser();
    //@ts-ignore
    const result=await db.select().from(sessionChatTable)

    .where(eq(SessionChatTable.id,sessionId));
    return NextResponse.json(result[0]);
}