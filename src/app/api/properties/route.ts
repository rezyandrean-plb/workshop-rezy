import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { asc, desc, ilike, gte, lte, and, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "6")));
  const sortBy = searchParams.get("sort") || "newest";
  const location = searchParams.get("location") || "";
  const priceRange = searchParams.get("priceRange") || "all";
  const propertyType = searchParams.get("propertyType") || "all";
  const bedsBaths = searchParams.get("bedsBaths") || "all";

  // Build filter conditions
  const conditions = [];

  if (location.trim()) {
    conditions.push(ilike(properties.address, `%${location.trim()}%`));
  }

  if (priceRange !== "all") {
    const [minStr, maxStr] = priceRange.split("-");
    const min = parseInt(minStr);
    const max = parseInt(maxStr);
    conditions.push(gte(properties.price, min));
    if (max) {
      conditions.push(lte(properties.price, max));
    }
  }

  if (propertyType !== "all") {
    conditions.push(ilike(properties.tag, propertyType));
  }

  if (bedsBaths !== "all") {
    const minBeds = parseInt(bedsBaths);
    if (!isNaN(minBeds)) {
      conditions.push(gte(properties.beds, minBeds));
    }
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Sorting
  let orderBy;
  switch (sortBy) {
    case "price-low":
      orderBy = asc(properties.price);
      break;
    case "price-high":
      orderBy = desc(properties.price);
      break;
    case "latest":
      orderBy = desc(properties.id);
      break;
    case "newest":
    default:
      orderBy = desc(properties.listedDate);
      break;
  }

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(properties)
    .where(whereClause);

  const total = countResult[0].count;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const offset = (page - 1) * limit;

  // Get paginated results
  const results = await db
    .select()
    .from(properties)
    .where(whereClause)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);

  return NextResponse.json({
    data: results,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}

export async function POST(request: NextRequest) {
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

    const [created] = await db
      .insert(properties)
      .values({
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
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/properties error:", err);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
