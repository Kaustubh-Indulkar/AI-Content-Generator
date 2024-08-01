"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../_components/TemplateListSection";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export interface HISTORY {
  ID: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function History() {
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchHistory = async () => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (email) {
        const result: HISTORY[] = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, email))
          .orderBy(desc(AIOutput.id));

        setHistoryList(result);
      }
    };

    fetchHistory();
  }, [user]);

  const getTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates?.find(
      (item) => item.slug == slug
    );
    return template?.name;
  };

  return (
    <div className="m-5 p-5 rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously generated AI content
      </p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {historyList.map((item, index) => (
        <div className="grid grid-cols-7 my-5 py-3 px-3" key={index}>
          <h2 className="col-span-2 flex gap-2 items-center">
            <Image
              src={Templates?.find((t) => t.slug === item.templateSlug)?.icon}
              width={25}
              height={25}
              alt=""
            />
            {getTemplateName(item.templateSlug)}
          </h2>
          <h2 className="col-span-2 line-clamp-3">{item.aiResponse}</h2>
          <h2>{item.createdAt}</h2>
          <h2>{item.aiResponse.length}</h2>
          <h2>
            <Button
              variant="ghost"
              className="text-primary"
              onClick={() => navigator.clipboard.writeText(item.aiResponse)}
            >
              Copy
            </Button>
          </h2>
        </div>
      ))}
    </div>
  );
}

export default History;
