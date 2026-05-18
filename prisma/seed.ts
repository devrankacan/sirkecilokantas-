import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@sirkecilokantas.com" },
    update: {},
    create: {
      email: "admin@sirkecilokantas.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // Kategoriler
  const categories = [
    { nameTr: "Kahvaltı", nameEn: "Breakfast", order: 1 },
    { nameTr: "Başlangıçlar", nameEn: "Starters", order: 2 },
    { nameTr: "Ana Yemekler", nameEn: "Main Courses", order: 3 },
    { nameTr: "Tatlılar", nameEn: "Desserts", order: 4 },
    { nameTr: "Sıcak İçecekler", nameEn: "Hot Beverages", order: 5 },
    { nameTr: "Soğuk İçecekler", nameEn: "Cold Beverages", order: 6 },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const existing = await prisma.category.findFirst({
      where: { nameTr: cat.nameTr },
    });
    if (!existing) {
      const created = await prisma.category.create({ data: cat });
      createdCategories[cat.nameTr] = created.id;
    } else {
      createdCategories[cat.nameTr] = existing.id;
    }
  }

  // Ürünler
  const products = [
    // Kahvaltı
    {
      nameTr: "Serpme Kahvaltı",
      nameEn: "Spread Breakfast",
      descriptionTr:
        "Peynir çeşitleri, zeytin, domates, salatalık, tereyağı, bal ve reçel ile",
      descriptionEn:
        "With assorted cheeses, olives, tomatoes, cucumbers, butter, honey and jam",
      price: 280.0,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      available: true,
      order: 1,
      categoryId: createdCategories["Kahvaltı"],
    },
    {
      nameTr: "Menemen",
      nameEn: "Menemen (Turkish Scrambled Eggs)",
      descriptionTr: "Domates, biber ve yumurta ile hazırlanan geleneksel Türk kahvaltısı",
      descriptionEn: "Traditional Turkish breakfast with tomatoes, peppers and eggs",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=400",
      available: true,
      order: 2,
      categoryId: createdCategories["Kahvaltı"],
    },
    {
      nameTr: "Omlet",
      nameEn: "Omelette",
      descriptionTr: "Kaşarlı veya sade, seçiminize göre hazırlanır",
      descriptionEn: "With cheese or plain, prepared to your preference",
      price: 95.0,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      available: true,
      order: 3,
      categoryId: createdCategories["Kahvaltı"],
    },

    // Başlangıçlar
    {
      nameTr: "Humus",
      nameEn: "Hummus",
      descriptionTr: "Nohut ezmesi, zeytinyağı ve baharatlarla servis edilir",
      descriptionEn: "Chickpea paste served with olive oil and spices",
      price: 85.0,
      image:
        "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400",
      available: true,
      order: 1,
      categoryId: createdCategories["Başlangıçlar"],
    },
    {
      nameTr: "Sigara Böreği",
      nameEn: "Fried Cheese Rolls",
      descriptionTr: "Çıtır yufka hamurunda beyaz peynir dolgulu börek",
      descriptionEn: "Crispy phyllo pastry filled with white cheese",
      price: 95.0,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      available: true,
      order: 2,
      categoryId: createdCategories["Başlangıçlar"],
    },
    {
      nameTr: "Mercimek Çorbası",
      nameEn: "Lentil Soup",
      descriptionTr: "Geleneksel kırmızı mercimek çorbası, limon ile servis edilir",
      descriptionEn: "Traditional red lentil soup, served with lemon",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
      available: true,
      order: 3,
      categoryId: createdCategories["Başlangıçlar"],
    },

    // Ana Yemekler
    {
      nameTr: "Izgara Levrek",
      nameEn: "Grilled Sea Bass",
      descriptionTr:
        "Günlük taze levrek, mevsim salata ve pilav ile servis edilir",
      descriptionEn:
        "Daily fresh sea bass, served with seasonal salad and rice",
      price: 385.0,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
      available: true,
      order: 1,
      categoryId: createdCategories["Ana Yemekler"],
    },
    {
      nameTr: "Kuzu Tandır",
      nameEn: "Lamb Tandoor",
      descriptionTr: "Özel baharatlarla marine edilmiş, tandırda pişirilmiş kuzu",
      descriptionEn: "Lamb marinated with special spices, cooked in tandoor oven",
      price: 420.0,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
      available: true,
      order: 2,
      categoryId: createdCategories["Ana Yemekler"],
    },
    {
      nameTr: "Tavuk Şiş",
      nameEn: "Chicken Shish Kebab",
      descriptionTr: "Marine edilmiş tavuk parçaları, közde pişirilmiş sebzeler ile",
      descriptionEn: "Marinated chicken pieces with grilled vegetables",
      price: 245.0,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      available: true,
      order: 3,
      categoryId: createdCategories["Ana Yemekler"],
    },
    {
      nameTr: "Mantı",
      nameEn: "Turkish Dumplings",
      descriptionTr: "El yapımı mantı, yoğurt ve domates sosu ile servis edilir",
      descriptionEn: "Handmade dumplings served with yogurt and tomato sauce",
      price: 195.0,
      image:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3b68?w=400",
      available: true,
      order: 4,
      categoryId: createdCategories["Ana Yemekler"],
    },

    // Tatlılar
    {
      nameTr: "Baklava",
      nameEn: "Baklava",
      descriptionTr: "Antep fıstıklı, şerbetli geleneksel baklava",
      descriptionEn: "Traditional baklava with pistachio and syrup",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1619651218470-93e7f3c0de7a?w=400",
      available: true,
      order: 1,
      categoryId: createdCategories["Tatlılar"],
    },
    {
      nameTr: "Sütlaç",
      nameEn: "Rice Pudding",
      descriptionTr: "Fırında pişirilmiş geleneksel Türk sütlacı",
      descriptionEn: "Traditional Turkish baked rice pudding",
      price: 85.0,
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
      available: true,
      order: 2,
      categoryId: createdCategories["Tatlılar"],
    },
    {
      nameTr: "Künefe",
      nameEn: "Kunefe",
      descriptionTr: "Kadayıf hamurunda tel peyniri, şerbetli ve antep fıstıklı",
      descriptionEn: "String cheese in shredded pastry, with syrup and pistachio",
      price: 135.0,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      available: false,
      order: 3,
      categoryId: createdCategories["Tatlılar"],
    },

    // Sıcak İçecekler
    {
      nameTr: "Türk Kahvesi",
      nameEn: "Turkish Coffee",
      descriptionTr: "Geleneksel Türk kahvesi, lokum ile servis edilir",
      descriptionEn: "Traditional Turkish coffee, served with Turkish delight",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
      available: true,
      order: 1,
      categoryId: createdCategories["Sıcak İçecekler"],
    },
    {
      nameTr: "Çay",
      nameEn: "Turkish Tea",
      descriptionTr: "Demlik çay, bardakta servis edilir",
      descriptionEn: "Brewed tea, served in glass",
      price: 25.0,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      available: true,
      order: 2,
      categoryId: createdCategories["Sıcak İçecekler"],
    },
    {
      nameTr: "Filtre Kahve",
      nameEn: "Filter Coffee",
      descriptionTr: "Özenle seçilmiş çekirdeklerden hazırlanan filtre kahve",
      descriptionEn: "Filter coffee prepared from carefully selected beans",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      available: true,
      order: 3,
      categoryId: createdCategories["Sıcak İçecekler"],
    },

    // Soğuk İçecekler
    {
      nameTr: "Ayran",
      nameEn: "Ayran (Yogurt Drink)",
      descriptionTr: "Ev yapımı taze ayran",
      descriptionEn: "Homemade fresh yogurt drink",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      available: true,
      order: 1,
      categoryId: createdCategories["Soğuk İçecekler"],
    },
    {
      nameTr: "Limonata",
      nameEn: "Lemonade",
      descriptionTr: "Taze sıkılmış limonata, nane ile servis edilir",
      descriptionEn: "Freshly squeezed lemonade, served with mint",
      price: 65.0,
      image:
        "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
      available: true,
      order: 2,
      categoryId: createdCategories["Soğuk İçecekler"],
    },
    {
      nameTr: "Mevsim Meyve Suyu",
      nameEn: "Seasonal Fruit Juice",
      descriptionTr: "Günlük taze sıkılmış mevsim meyve suyu",
      descriptionEn: "Daily freshly squeezed seasonal fruit juice",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1534353473418-4cfa0c0d7b26?w=400",
      available: true,
      order: 3,
      categoryId: createdCategories["Soğuk İçecekler"],
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { nameTr: product.nameTr },
    });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }

  console.log("Seeding completed!");
  console.log("Admin email: admin@sirkecilokantas.com");
  console.log("Admin password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
