import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, numId))
    .limit(1);

  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  return NextResponse.json(property);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const {
      title,
      address,
      price,
      priceLabel,
      beds,
      baths,
      sqft,
      tag,
      tagColor,
      badge,
      badgeColor,
      image,
      listedDate,
    } = body;

    if (!title || !address || price == null || !priceLabel || beds == null || baths == null || !sqft || !tag || !tagColor || !badge || !badgeColor || !image || !listedDate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const [updated] = await db
      .update(properties)
      .set({
        title,
        address,
        price: Number(price),
        priceLabel,
        beds: Number(beds),
        baths: Number(baths),
        sqft,
        tag,
        tagColor,
        badge,
        badgeColor,
        image,
        listedDate,
      })
      .where(eq(properties.id, numId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/properties/[id] error:", err);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const [deleted] = await db
    .delete(properties)
    .where(eq(properties.id, numId))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Property deleted", id: numId });
}
