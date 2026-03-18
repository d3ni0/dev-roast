import { NextRequest, NextResponse } from "next/server";
import { RoastRequestSchema, ErrorCode } from "@/types/roast";
import { generateRoast } from "@/lib/roast";
import { ZodError } from "zod";
import type { LanguageId } from "@/types/languages";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedRequest = RoastRequestSchema.parse(body);

    // Generate roast
    const response = await generateRoast({
      code: validatedRequest.code,
      language: validatedRequest.language as LanguageId,
      mode: validatedRequest.mode,
    });

    // Return success response
    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    // Handle validation errors
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: {
            message: `Invalid request: ${err.issues[0]?.message || "validation failed"}`,
            code: ErrorCode.VALIDATION_ERROR,
          },
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Handle LLM errors with specific codes
    if (err && typeof err === "object" && "code" in err) {
      const errorCode = (err as any).code as string;
      const errorMessage = err && typeof err === "object" && "message" in err ? String((err as any).message) : "An error occurred";

      // LLM not configured (500)
      if (errorCode === ErrorCode.LLM_NOT_CONFIGURED) {
        return NextResponse.json(
          {
            error: {
              message: "LLM API not configured. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY.",
              code: errorCode,
            },
          },
          { status: 500 }
        );
      }

      // Other LLM errors (500)
      return NextResponse.json(
        {
          error: {
            message: errorMessage,
            code: errorCode,
          },
        },
        { status: 500 }
      );
    }

    // Generic error (500)
    console.error("Unexpected error in /api/roast:", err);
    return NextResponse.json(
      {
        error: {
          message: "An unexpected error occurred",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
