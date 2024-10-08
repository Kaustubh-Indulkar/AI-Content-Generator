"use client"
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

// Update the type to match your actual data
interface AIOutputType {
    id: number;
    FormData: string;
    aiResponse: string | null; // Allow null
    templateSlug: string;
    createdBy: string;
    createdAt: string | null; // Allow null
}

function UsageTrack() {
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const router = useRouter();
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

    useEffect(() => {
        if (user) {
            GetData();
        }
    }, [user]);

    useEffect(() => {
        if (updateCreditUsage && user) {
            GetData();
        }
    }, [updateCreditUsage, user]);

    // Modified GetData with conditional check
    const GetData = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;

        // Ensure the email exists before querying the database
        if (!email) {
            console.error('User email is undefined');
            return;
        }

        const result: AIOutputType[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, email));
        GetTotalUsage(result);
    };

    // Add type for result (AIOutputType[])
    const GetTotalUsage = (result: AIOutputType[]) => {
        let total = 0;
        result.forEach(element => {
            total += Number(element.aiResponse?.length || 0); // Fallback to 0 if aiResponse is null
        });
        setTotalUsage(total);
        console.log(total);
    };

    const handleUpgradeClick = () => {
        router.push("/dashboard/billing");
    };

    return (
        <div className="m-5">
            <div className="bg-primary text-white rounded-lg p-3">
                <h2 className="font-medium">Credits</h2>
                <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
                    <div className="h-2 bg-white rounded-full" style={{ width: (totalUsage / 10000) * 100 + "%" }}></div>
                </div>
                <h2 className="text-sm my-2">{totalUsage}/10,000 Credits Used</h2>
            </div>
            <Button variant={'secondary'} className="w-full my-3 text-primary" onClick={handleUpgradeClick}>
                Upgrade
            </Button>
        </div>
    );
}

export default UsageTrack;
