import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing or invalid id parameter" },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("Work")
      .select("description, descriptionAudioUrl")
      .eq("id", id)
      .single();

    console.log(data);

    if (error || !data) {
      return NextResponse.json(
        { error: "Work not found or error fetching description" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      description: data.description,
      descriptionAudioUrl: data.descriptionAudioUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
