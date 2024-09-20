"use client";
import React, { useContext, useState } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { ArrowLeft } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { AIOutput } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  /**
   * Used to generate content from AI
   * @param formData 
   * @returns 
   */
  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000) {
      console.log("Please Upgrade!");
      router.push('/dashboard/billing');
      return;
    }

    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(finalAIPrompt);
    console.log(result.response.text());
    setAiOutput(result?.response.text());

    // Save the data in the database
    await SaveInDb(formData, selectedTemplate?.slug, result?.response.text());

    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (formData: any, slug: string | undefined, aiResp: string) => {
    const createdBy = user?.primaryEmailAddress?.emailAddress || "unknown@example.com"; // Provide a default value
    const createdAt = moment().format('DD/MM/yyyy');

    const result = await db.insert(AIOutput).values({
      FormData: formData, // Corrected property name
      templateSlug: slug || "default-slug", // Provide a fallback if slug is undefined
      aiResponse: aiResp || "", // Ensure aiResp is not undefined
      createdBy: createdBy,
      createdAt: createdAt,
    });

    console.log(result);
  };

  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />

        {/* Output Section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
