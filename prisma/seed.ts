import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

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

  const categoryData = [
    { nameTr: "Başlangıçlar", nameEn: "Starters", order: 1 },
    { nameTr: "Salatalar", nameEn: "Salads", order: 2 },
    { nameTr: "Makarnalar", nameEn: "Pasta", order: 3 },
    { nameTr: "Ana Yemekler", nameEn: "Main Courses", order: 4 },
    { nameTr: "Burgerlar", nameEn: "Burgers", order: 5 },
    { nameTr: "Pizzalar", nameEn: "Pizzas", order: 6 },
    { nameTr: "Garnitürler", nameEn: "Sides", order: 7 },
    { nameTr: "Kahvaltı", nameEn: "Breakfast", order: 8 },
    { nameTr: "Tatlılar", nameEn: "Desserts", order: 9 },
    { nameTr: "İmzalı Tatlılar", nameEn: "Signature Desserts", order: 10 },
    { nameTr: "House Cocktails", nameEn: "House Cocktails", order: 11 },
    { nameTr: "International Cocktails", nameEn: "International Cocktails", order: 12 },
    { nameTr: "Spritz Cocktails", nameEn: "Spritz Cocktails", order: 13 },
    { nameTr: "Alkolsüz Kokteyl", nameEn: "Sober Curious", order: 14 },
    { nameTr: "Kırmızı Şaraplar", nameEn: "Red Wines", order: 15 },
    { nameTr: "Beyaz Şaraplar", nameEn: "White Wines", order: 16 },
    { nameTr: "Rosé Şaraplar", nameEn: "Rosé Wines", order: 17 },
    { nameTr: "Şampanya & Prosecco", nameEn: "Champagne & Prosecco", order: 18 },
    { nameTr: "Votka", nameEn: "Vodka", order: 19 },
    { nameTr: "Cin", nameEn: "Gin", order: 20 },
    { nameTr: "Rom", nameEn: "Rum", order: 21 },
    { nameTr: "Tekila & Mezcal", nameEn: "Tequila & Mezcal", order: 22 },
    { nameTr: "Viski", nameEn: "Whiskey", order: 23 },
    { nameTr: "Konyak & Brendi", nameEn: "Cognac & Brandy", order: 24 },
    { nameTr: "Soğuk İçecekler", nameEn: "Cold Drinks", order: 25 },
    { nameTr: "Kahveler", nameEn: "Coffees", order: 26 },
    { nameTr: "Çay & Bitki Çayları", nameEn: "Tea & Herbal Teas", order: 27 },
    { nameTr: "Taze Meyve Suları", nameEn: "Fresh Juices", order: 28 },
  ];

  const cat: Record<string, string> = {};
  for (const c of categoryData) {
    const existing = await prisma.category.findFirst({ where: { nameTr: c.nameTr } });
    if (!existing) {
      const created = await prisma.category.create({ data: c });
      cat[c.nameTr] = created.id;
    } else {
      cat[c.nameTr] = existing.id;
    }
  }

  const products = [
    // ── BAŞLANGIÇLAR ──────────────────────────────────────────────
    { nameTr: "Günün Çorbası", nameEn: "Soup Of The Day", descriptionTr: "Günlük hazırlanan taze çorba", descriptionEn: "Freshly prepared daily soup", price: 450, order: 1, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Guacamole", nameEn: "Guacamole", descriptionTr: "Avokado Ezmesi, Kişniş, Lime, Chili Biber, Zeytinyağı, Nachos ile", descriptionEn: "Avocado Spread, Coriander, Lime, Chili Pepper, Olive Oil, Nachos", price: 1150, order: 2, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Dana Carpaccio", nameEn: "Beef Carpaccio", descriptionTr: "120 gr Dana Bonfile, Zerdeçallı Aioli, Parmesan, Roka, Balsamic Glaze", descriptionEn: "120g Beef Tenderloin, Turmeric Aioli, Parmesan, Arugula, Balsamic Glaze", price: 1880, order: 3, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Burrata", nameEn: "Burrata", descriptionTr: "150 gr Manda Burrata, Salsa Verde Sos, Mevsim Sebze & Meyveleri", descriptionEn: "150g Buffalo Burrata, Salsa Verde Sauce, Seasonal Vegetables & Fruits", price: 1500, order: 4, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Steak Tartare", nameEn: "Steak Tartare", descriptionTr: "Fransız Usulü Tartare, 100 gr Bonfile, Tobiko Havyar, Patates Cipsi", descriptionEn: "French-Style Tartare, 100g Tenderloin, Tobiko Caviar, Crispy Potato Chips", price: 1850, order: 5, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Humus", nameEn: "Hummus", descriptionTr: "Antep Fıstıklı Salsa & Zeytinyağı", descriptionEn: "Pistachio Salsa & Olive Oil", price: 1200, order: 6, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Karides Tempura", nameEn: "Shrimp Tempura", descriptionTr: "150 gr Karides, Coleslaw Salatası, Sarımsaklı Aioli", descriptionEn: "150g Shrimp, Coleslaw Salad, Garlic Aioli", price: 2100, order: 7, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Çıtır Tavuk", nameEn: "Crispy Chicken", descriptionTr: "180 gr Panelenmiş Tavuk Parçaları, Pimenton Aioli, Lime", descriptionEn: "180g Breaded Chicken Pieces, Pimenton Aioli, Lime", price: 1600, order: 8, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Kalamar Tempura", nameEn: "Calamari Tempura", descriptionTr: "150 gr Kalamar, Bademli Tarator Sos, Soya Filizi Salatası, Lime", descriptionEn: "150g Calamari, Almond Tarator Sauce, Soy Sprout Salad, Lime", price: 1950, order: 9, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Edamame", nameEn: "Edamame", descriptionTr: "200 gr Kabuklu Edamame, Acılı & Maldon Tuz ile", descriptionEn: "200g Shelled Edamame, Served Spicy Or With Maldon Salt", price: 700, order: 10, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Fırın Mücver", nameEn: "Baked Mucver", descriptionTr: "Taze Yeşil Sebzeler, İslenmiş Yoğurt, Kişniş & Ceviz", descriptionEn: "Fresh Green Vegetables, Smoked Yogurt, Coriander & Walnuts", price: 1200, order: 11, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Zeytinyağlı Limonlu Karides", nameEn: "Olive Oil Lemon & Shrimps", descriptionTr: "İki kişi için: 200 gr Karides, Limon, Sarımsak, Havuç Yağı, Soğan, Maydanoz & Tereyağı", descriptionEn: "For 2 people: 200g Shrimps, Lemon, Garlic, Carrot Oil, Onion, Parsley & Butter", price: 2400, order: 12, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Füme Somon Bruschetta", nameEn: "Smoked Salmon Bruschetta", descriptionTr: "100 gr Somon Füme, Dereotlu Labne Sos, Avakado Dilimleri, Somon Havyarı, Kapari & Taze Otlar", descriptionEn: "100g Smoked Salmon, Dill Labneh Sauce, Avocado Slices, Salmon Caviar, Capers & Fresh Herbs", price: 1750, order: 13, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Peynir & Şarküteri Tabağı", nameEn: "Cheese & Charcuterie Platter", descriptionTr: "Yerli & İthal Çeşitler, El Yapımı Marmelatlar", descriptionEn: "Local & Imported Varieties, Handmade Marmalades", price: 1400, order: 14, categoryId: cat["Başlangıçlar"] },
    { nameTr: "Meyve Tabağı", nameEn: "Seasonal Fruit Platter", descriptionTr: "Mevsim Meyvelerine Göre Değişkenlik Gösterir", descriptionEn: "Varies According To The Season", price: 1950, order: 15, categoryId: cat["Başlangıçlar"] },

    // ── SALATALAR ──────────────────────────────────────────────────
    { nameTr: "Domates Salatası", nameEn: "Tomato Salad", descriptionTr: "Taze mevsim domatesleri", descriptionEn: "Fresh seasonal tomatoes", price: 1150, order: 1, categoryId: cat["Salatalar"] },
    { nameTr: "Roka Salatası", nameEn: "Arugula Salad", descriptionTr: "Kurutulmuş Çeri Domates, Zeytinyağlı İncir, Ceviz, Parmesan", descriptionEn: "Sun-Dried Cherry Tomatoes, Olive Oil Figs, Walnuts, Parmesan", price: 1200, order: 2, categoryId: cat["Salatalar"] },
    { nameTr: "Somon Füme Salata", nameEn: "Smoked Salmon Salad", descriptionTr: "100 gr Somon Füme, Kimyonlu Baby Patates, Rezene, Edamame, Mevsim Yeşillikleri, Soğan Turşusu", descriptionEn: "100g Smoked Salmon, Cumin Baby Potatoes, Fennel, Seasonal Greens, Pickled Onion", price: 1900, order: 3, categoryId: cat["Salatalar"] },
    { nameTr: "Sezar Salata Tavuklu", nameEn: "Caesar Salad With Chicken", descriptionTr: "160 gr Tavuk Göğüs, Yedikule Marulu, Göbek Marul, Çeri Domates, El Yapımı Sezar Sos, Kıtır Ekmek", descriptionEn: "160g Chicken Breast, Baby Yedikule Lettuce, Romaine Lettuce, Cherry Tomatoes, Homemade Caesar Dressing, Croutons", price: 1500, order: 4, categoryId: cat["Salatalar"] },
    { nameTr: "Izgara Ahtapot Salatası", nameEn: "Grilled Octopus Salad", descriptionTr: "2 Kol Ahtapot, Taze Otlar, Chimichurri Sos, Kırmızı Soğan Turşusu, Kurutulmuş Çeri Domates, Sumak", descriptionEn: "2 Octopus Arm, Fresh Herbs, Chimichurri Sauce, Pickled Red Onion, Sun-Dried Cherry Tomatoes, Sumac", price: 2400, order: 5, categoryId: cat["Salatalar"] },
    { nameTr: "Çilekli & Kinoalı Semizotu Salatası", nameEn: "Strawberry & Quinoa Purslane Salad", descriptionTr: "Semizotu, Mini Yedikule, Kinoa, Çeri Domates, Salatalık, Badem, Hardallı Narenciye Vinegret", descriptionEn: "Purslane, Baby Yedikule Lettuce, Quinoa, Cherry Tomato, Cucumber, Almond, Mustard Citrus Vinaigrette", price: 1300, order: 6, categoryId: cat["Salatalar"] },

    // ── MAKARNALAR ─────────────────────────────────────────────────
    { nameTr: "Pesto Spaghetti & Burrata", nameEn: "Pesto Spaghetti & Burrata", descriptionTr: "120 gr Spaghetti, El Yapımı Genovese Pesto Sos, Aromatik Pancho, Çeri Domates, Burrata", descriptionEn: "120g Spaghetti, Homemade Genovese Pesto Sauce, Aromatic Pancho, Cherry Tomato, Burrata", price: 1850, order: 1, categoryId: cat["Makarnalar"] },
    { nameTr: "Spaghetti Bolognese", nameEn: "Spaghetti Bolognese", descriptionTr: "120 gr Spaghetti, Bologna Usulü Sos, Parmesan", descriptionEn: "120g Spaghetti, 140g Ground Beef, Bologna-Style Sauce, Parmesan", price: 1650, order: 2, categoryId: cat["Makarnalar"] },
    { nameTr: "Tavuklu & Mantarlı Tagliatelli", nameEn: "Chicken & Mushroom Tagliatelle", descriptionTr: "120 gr Tagliatelli, Mevsim Mantarları, 120 gr Tavuk But, Parmesan, Frenk Soğanı", descriptionEn: "120g Tagliatelle, Seasonal Mushrooms, 120g Chicken Thigh, Parmesan, Chives", price: 1600, order: 3, categoryId: cat["Makarnalar"] },
    { nameTr: "Deniz Mahsullü Linguini", nameEn: "Seafood Linguine", descriptionTr: "120 gr Linguini, 60 gr Vongole, 60 gr Kara Midye, 60 gr Karides, 60 gr Somon, Bisque Sos", descriptionEn: "120g Linguine, 60g Clams, 60g Mussels, 60g Shrimp, 60g Salmon, Bisque Sauce", price: 2200, order: 4, categoryId: cat["Makarnalar"] },
    { nameTr: "Izgara Ahtapotlu Spagetti", nameEn: "Grilled Octopus Spaghetti", descriptionTr: "1 Kol Ahtapot, Sarımsaklı Rende Domates Sos, Maydanoz", descriptionEn: "1 Octopus Arm, Garlic Grated Tomato Sauce, Parsley", price: 2250, order: 5, categoryId: cat["Makarnalar"] },

    // ── ANA YEMEKLER ───────────────────────────────────────────────
    { nameTr: "Şaşlık Kebabı", nameEn: "Shashlik Kebab", descriptionTr: "220 gr Dana Bonfile, Kuyruk Yağı, Patates Püresi, Izgara Taze Soğan, El Yapımı Lavaş", descriptionEn: "220g Beef Tenderloin, Tail Fat, Mashed Potatoes, Grilled Spring Onion, Homemade Flatbread", price: 2800, order: 1, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Ev Köftesi", nameEn: "Homemade Meatballs", descriptionTr: "220 gr Ev Yapımı Köfte, Köz Patlıcan Püresi, Yeşil Köz Biber", descriptionEn: "220g Homemade Meatballs, Charred Eggplant Puree, Charred Green Pepper", price: 2000, order: 2, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Izgara Antrikot", nameEn: "Grilled Entrecote", descriptionTr: "250 gr Antrikot, Chef de Jus, Vişne Marmelatı, Patates Kızartması", descriptionEn: "250g Entrecote, Chef de Jus, Sour Cherry Marmalade, French Fries", price: 2800, order: 3, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Izgara Dana Pirzola", nameEn: "Grilled Beef Ribs", descriptionTr: "400 gr Dana Pirzola, Baby Patates, Izgara Köz Sebzeler", descriptionEn: "400g Beef Ribs, Baby Potatoes, Charred Grilled Vegetables", price: 3850, order: 4, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Kıvırcık Kuzu Pirzola", nameEn: "Turkish Kıvırcık Lamb Chops", descriptionTr: "350 gr Süt Kuzu Pirzola, Patates Pave, Köz Sebzeler", descriptionEn: "350g Lamb Chops, Potato Pave, Charred Vegetables", price: 3200, order: 5, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Kuzu Omuz", nameEn: "Lamb Shoulder", descriptionTr: "250 gr Kuzu Omuz, Izgara Mini Yedikule, Hardal Tohumu", descriptionEn: "250g Lamb Shoulder, Grilled Mini Yedikule Lettuce, Mustard Seeds", price: 3300, order: 6, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Fırında Çipura", nameEn: "Baked Sea Bream", descriptionTr: "400-500 gr Arası Deniz Çipurası, Tereyağlı Baharatlı Sos, Taze Ot Salatası", descriptionEn: "400-500g Fresh Sea Bream, Spiced Butter Sauce, Fresh Herb Salad", price: 2200, order: 7, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Izgara Levrek", nameEn: "Grilled Sea Bass", descriptionTr: "400-500 gr Arası Deniz Levreği, Taze Ot Salatası", descriptionEn: "400-500g Fresh Sea Bass, Fresh Herb Salad", price: 2200, order: 8, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Levrek Fleto Buğulama", nameEn: "Steamed Sea Bass Fillet", descriptionTr: "200 gr Levrek Fleto, Narenciye Soslu, Kapari, Kuru Yaban Mersini & File Badem", descriptionEn: "200g Sea Bass Fillet, Citrus Sauce, Capers & Sliced Almonds", price: 2400, order: 9, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Somon", nameEn: "Salmon", descriptionTr: "200 gr Somon, Narenciye Portakal Sos, Beluga Mercimeği", descriptionEn: "200g Salmon, Citrus Orange Sauce, Beluga Lentils", price: 2200, order: 10, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Kuruyemişli Pane Tavuk", nameEn: "Nut Crusted Chicken", descriptionTr: "160 gr Tavuk Göğsü, Kuruyemişli Pane, Ballı Hardallı", descriptionEn: "160g Chicken Breast, Nut Crust, Honey Mustard", price: 1850, order: 11, categoryId: cat["Ana Yemekler"] },
    { nameTr: "Mantar Soslu Tavuk", nameEn: "Chicken in Mushroom Sauce", descriptionTr: "180 gr Tavuk, Mevsim Mantarları, Tavuk Suyu Sos", descriptionEn: "180g Chicken, Seasonal Mushrooms, Chicken Broth Sauce", price: 1900, order: 12, categoryId: cat["Ana Yemekler"] },

    // ── BURGERLAR ──────────────────────────────────────────────────
    { nameTr: "Cronton Burger", nameEn: "Cronton Burger", descriptionTr: "150 gr Burger Köftesi, Dana Bacon, Karamelize Soğan, Cheddar, Burger Sos & Patates Kızartması", descriptionEn: "150g Beef Patty, Beef Bacon, Caramelized Onion, Cheddar, Burger Sauce & Fries", price: 1650, order: 1, categoryId: cat["Burgerlar"] },
    { nameTr: "Çıtır Tavuk Burger", nameEn: "Crispy Chicken Burger", descriptionTr: "130 gr Panelenmiş Tavuk, Coleslaw Salata, Sos, Turşu, Patates Kızartması", descriptionEn: "130g Breaded Chicken, Coleslaw Salad, Burger Sauce, Pickles, Fries", price: 1500, order: 2, categoryId: cat["Burgerlar"] },

    // ── PIZZALAR ───────────────────────────────────────────────────
    { nameTr: "Margarita", nameEn: "Margherita", descriptionTr: "Domates Sos, Mozzarella Peyniri, Fesleğen", descriptionEn: "Tomato Paste, Mozzarella, Basil", price: 1400, order: 1, categoryId: cat["Pizzalar"] },
    { nameTr: "Vejeteryan Pizza", nameEn: "Vegetarian Pizza", descriptionTr: "Domates Sos, Mozzarella, Izgara Mevsim Sebzeleri, Roka, Fesleğen", descriptionEn: "Tomato Paste, Mozzarella, Grilled Seasonal Vegetables, Arugula & Basil", price: 1450, order: 2, categoryId: cat["Pizzalar"] },
    { nameTr: "Anadolu Pizza", nameEn: "Anatolian Pizza", descriptionTr: "100 gr Kavurma, Domates Sos, Mozzarella, Köy Biberi, Mantar", descriptionEn: "100g Fried Beef, Tomato Paste, Mozzarella, Organic Pepper, Mushrooms", price: 1950, order: 3, categoryId: cat["Pizzalar"] },
    { nameTr: "Dört Peynirli Pizza", nameEn: "Quatro Formaggi", descriptionTr: "Mozzarella, Emmantel, Rokfor, Parmesan, Fesleğen", descriptionEn: "Mozzarella, Emmental, Roquefort, Parmesan, Basil", price: 1850, order: 4, categoryId: cat["Pizzalar"] },
    { nameTr: "Pizza 1912", nameEn: "Pizza 1912", descriptionTr: "Domates Sos, Mozzarella, 100 gr Kasap Sucuk, İstridye Mantarı, Mısır, Fesleğen", descriptionEn: "Tomato Paste, Mozzarella, 100g Soujouk, Oyster Mushrooms, Corn, Basil", price: 2100, order: 5, categoryId: cat["Pizzalar"] },
    { nameTr: "Pizza Burrata", nameEn: "Pizza Burrata", descriptionTr: "Domates Sos, Mozzarella, 100 gr Manda Burrata, Pesto Sos", descriptionEn: "Tomato Paste, Mozzarella, 100g Burrata, Pesto Paste", price: 1900, order: 6, categoryId: cat["Pizzalar"] },
    { nameTr: "Bonfile Tiftik Pizza", nameEn: "Shredded Beef Tenderloin Pizza", descriptionTr: "100 gr Bonfile Eti, Acılı BBQ Sos, Mozzarella Peyniri, Roka", descriptionEn: "100g Beef Tenderloin, Spicy BBQ Sauce, Mozzarella & Arugula", price: 2400, order: 7, categoryId: cat["Pizzalar"] },

    // ── GARNİTÜRLER ────────────────────────────────────────────────
    { nameTr: "Trüflü Parmesan Patates Kızartması", nameEn: "Truffle Parmesan Fries", descriptionTr: "Trüf yağı ve parmesan ile", descriptionEn: "With truffle oil and parmesan", price: 650, order: 1, categoryId: cat["Garnitürler"] },
    { nameTr: "Patates Kızartması", nameEn: "French Fries", descriptionTr: "Taze patates kızartması", descriptionEn: "Fresh cut fries", price: 600, order: 2, categoryId: cat["Garnitürler"] },

    // ── KAHVALTI ───────────────────────────────────────────────────
    { nameTr: "Serpme Kahvaltı Tabağı (2 kişilik)", nameEn: "Traditional Turkish Breakfast (For 2)", descriptionTr: "Tereyağı, Bal, Kaymak, Reçel, Fındık Ezmesi, Söğüş & Taze Yeşillikler, Peynir & Zeytin Çeşitleri, Tereyağında Pastırma Sucuk, Menemen, Göz Yumurta & Kaşarlı-Zahterli Tırnak Pide", descriptionEn: "Butter, Honey, Clotted Cream, Jam, Hazelnut Spread, Seasonal Vegetables, Cheese Varieties & Olives, Pastrami Soujouk, Menemen, Fried Egg, Pitta Bread With Cheese and Zahter", price: 3600, order: 1, categoryId: cat["Kahvaltı"] },
    { nameTr: "Türk Kahvaltısı", nameEn: "Turkish Breakfast", descriptionTr: "Peynir & Zeytin Çeşitleri, Bal, Tereyağı, Reçel, Kahvaltılık Söğüş, Haşlanmış Yumurta, Ekmek Üstü Sucuk", descriptionEn: "Cheese Varieties & Olives, Honey, Butter, Jam, Seasonal Vegetables, Boiled Egg, Soujouk On the Bread", price: 1650, order: 2, categoryId: cat["Kahvaltı"] },
    { nameTr: "Fransız Kahvaltısı", nameEn: "French Breakfast", descriptionTr: "Kruvasan, French Toast, Reçel, Tereyağı, Mevsim Meyvesi, Fındık Ezmesi", descriptionEn: "Croissant, French Toast, Jam, Butter, Seasonal Fruits, Hazelnut Spread", price: 1350, order: 3, categoryId: cat["Kahvaltı"] },
    { nameTr: "İngiliz Kahvaltısı", nameEn: "English Breakfast", descriptionTr: "Domates Soslu Fasulye, Mantar, Frankfurter Sosis, Dana Bacon, Göz Yumurta", descriptionEn: "Beans in Tomato Sauce, Mushrooms, Frankfurter Sausage, Beef Bacon, Sunny-Side-Up Eggs", price: 1400, order: 4, categoryId: cat["Kahvaltı"] },
    { nameTr: "Protein Kasesi", nameEn: "Protein Bowl", descriptionTr: "Süzme Yoğurt, Fıstık Ezmesi, Kaju, Muz, Keten Tohumu & Petek Bal", descriptionEn: "Yogurt, Peanut Butter, Cashew, Banana, Flaxseed & Honeycomb", price: 1100, order: 5, categoryId: cat["Kahvaltı"] },
    { nameTr: "Granola Kasesi", nameEn: "Granola Bowl", descriptionTr: "Süzme Yoğurt, Fırınlanmış Yulaf, Mevsim Meyveleri", descriptionEn: "Yogurt & Granola, Seasonal Fruits", price: 750, order: 6, categoryId: cat["Kahvaltı"] },
    { nameTr: "Avokado Tartine", nameEn: "Avocado Tartine", descriptionTr: "Ekşi Maya Ekmek Üzerinde, Avokado Ezmesi, Avokado Dilimleri, Dereotu, Portakal", descriptionEn: "On Sourdough Bread, Avocado Spread, Avocado Slices, Dill, Oranges", price: 850, order: 7, categoryId: cat["Kahvaltı"] },
    { nameTr: "Füme Somon Tartine", nameEn: "Smoked Salmon Tartine", descriptionTr: "Ekşi Maya Ekmek Üzerinde, Dereotlu Labne Sos, Roka, 100 gr Füme Somon, Avokado Dilimleri", descriptionEn: "On Sourdough Bread, Dill Cream Cheese, Arugula, 100g Smoked Salmon, Avocado Slices", price: 1900, order: 8, categoryId: cat["Kahvaltı"] },
    { nameTr: "Domatesli Sucuk Hellim Ragu", nameEn: "Tomato, Soujouk & Halloumi Ragu", descriptionTr: "Domates ragu, sucuk ve hellim peyniri", descriptionEn: "Tomato ragu with soujouk and halloumi cheese", price: 970, order: 9, categoryId: cat["Kahvaltı"] },
    { nameTr: "Humus & Sucuk", nameEn: "Hummus & Soujouk", descriptionTr: "Humus üzerinde servis edilen sucuk", descriptionEn: "Soujouk served over hummus", price: 970, order: 10, categoryId: cat["Kahvaltı"] },
    { nameTr: "Ekşi Maya Ekmek Üzerinde Çırpılmış Yumurta", nameEn: "Scrambled Eggs On Sourdough Bread", descriptionTr: "Ekşi maya ekmeği üzerinde çırpılmış yumurta", descriptionEn: "Scrambled eggs on sourdough bread", price: 480, order: 11, categoryId: cat["Kahvaltı"] },
    { nameTr: "Pankek", nameEn: "Pancake", descriptionTr: "Mevsim Meyveleri, Maple Şurup", descriptionEn: "Seasonal Fruits, Maple Syrup", price: 680, order: 12, categoryId: cat["Kahvaltı"] },
    { nameTr: "Omlet", nameEn: "Omelette", descriptionTr: "Taze otlar ile servis edilir. 3 yumurta. İlave: Kavurma +320 TL, Mantar +150 TL, Beyaz Peynir +120 TL, Sucuk +320 TL, Ispanak +80 TL", descriptionEn: "Served with fresh herbs. 3 eggs. Add-ons: Fried Beef +320 TL, Mushrooms +150 TL, White Cheese +120 TL, Soujouk +320 TL, Spinach +80 TL", price: 390, order: 13, categoryId: cat["Kahvaltı"] },
    { nameTr: "Menemen", nameEn: "Menemen (Turkish Shakshuka)", descriptionTr: "Domates, biber ve yumurta ile hazırlanan geleneksel Türk kahvaltısı", descriptionEn: "Traditional Turkish breakfast with tomatoes, peppers and eggs", price: 620, order: 14, categoryId: cat["Kahvaltı"] },
    { nameTr: "Bal & Kaymak", nameEn: "Honey & Clotted Cream", descriptionTr: "Taze kaymak ve doğal bal", descriptionEn: "Fresh clotted cream and natural honey", price: 600, order: 15, categoryId: cat["Kahvaltı"] },
    { nameTr: "Kahvaltılık Peynir & Şarküteri Tabağı", nameEn: "Cheese & Charcuterie Plate", descriptionTr: "Peynir ve şarküteri çeşitleri", descriptionEn: "Assorted cheeses and charcuterie", price: 1400, order: 16, categoryId: cat["Kahvaltı"] },
    { nameTr: "Söğüş Tabağı", nameEn: "Sliced Breakfast Vegetables Plate", descriptionTr: "Mevsim sebzelerinden oluşan söğüş tabağı", descriptionEn: "Seasonal sliced vegetables plate", price: 500, order: 17, categoryId: cat["Kahvaltı"] },

    // ── TATLILAR ───────────────────────────────────────────────────
    { nameTr: "San Sebastian Cheesecake", nameEn: "San Sebastian Cheesecake", descriptionTr: "Geleneksel San Sebastian usulü cheesecake", descriptionEn: "Traditional San Sebastian style cheesecake", price: 800, order: 1, categoryId: cat["Tatlılar"] },
    { nameTr: "Çilekli Magnolia", nameEn: "Strawberry Magnolia", descriptionTr: "Çilek ile hazırlanan magnolia tatlısı", descriptionEn: "Magnolia dessert with strawberry", price: 750, order: 2, categoryId: cat["Tatlılar"] },
    { nameTr: "Elmalı Tart", nameEn: "Apple Tart", descriptionTr: "Taze elmalı tart", descriptionEn: "Fresh apple tart", price: 750, order: 3, categoryId: cat["Tatlılar"] },
    { nameTr: "Tiramisu", nameEn: "Tiramisu", descriptionTr: "Klasik İtalyan tiramisusu", descriptionEn: "Classic Italian tiramisu", price: 750, order: 4, categoryId: cat["Tatlılar"] },
    { nameTr: "Limonlu Cheesecake", nameEn: "Lemon Cheesecake", descriptionTr: "Limon kremalı cheesecake", descriptionEn: "Lemon cream cheesecake", price: 750, order: 5, categoryId: cat["Tatlılar"] },
    { nameTr: "Lotus Cheesecake", nameEn: "Lotus Cheesecake", descriptionTr: "Lotus bisküvi ile hazırlanan cheesecake", descriptionEn: "Cheesecake with Lotus biscuit", price: 750, order: 6, categoryId: cat["Tatlılar"] },
    { nameTr: "Sütlaç", nameEn: "Rice Pudding", descriptionTr: "Fırında pişirilmiş geleneksel Türk sütlacı", descriptionEn: "Traditional Turkish baked rice pudding", price: 750, order: 7, categoryId: cat["Tatlılar"] },
    { nameTr: "Beyaz Çikolatalı Brownie", nameEn: "White Chocolate Brownie", descriptionTr: "Beyaz çikolatalı ıslak brownie", descriptionEn: "White chocolate brownie", price: 750, order: 8, categoryId: cat["Tatlılar"] },
    { nameTr: "Antep Fıstıklı Brownie", nameEn: "Pistachio Brownie", descriptionTr: "Antep fıstıklı ıslak brownie", descriptionEn: "Pistachio brownie", price: 750, order: 9, categoryId: cat["Tatlılar"] },
    { nameTr: "Baklava", nameEn: "Baklava", descriptionTr: "Geleneksel baklava", descriptionEn: "Traditional baklava", price: 900, order: 10, categoryId: cat["Tatlılar"] },
    { nameTr: "Havuç Dilim Baklava", nameEn: "Carrot Slice Baklava", descriptionTr: "Havuç dilim şeklinde baklava", descriptionEn: "Carrot-shaped slice baklava", price: 900, order: 11, categoryId: cat["Tatlılar"] },

    // ── İMZALI TATLILAR ────────────────────────────────────────────
    { nameTr: "Crunchy Bar", nameEn: "Crunchy Bar", descriptionTr: "Özel imzalı tatlı", descriptionEn: "Signature dessert", price: 870, order: 1, categoryId: cat["İmzalı Tatlılar"] },
    { nameTr: "Dağ Meyveli Çikolatalı Mus", nameEn: "Mountain Fruit Chocolate Mousse", descriptionTr: "Dağ meyveleri ile çikolata mousse", descriptionEn: "Chocolate mousse with mountain berries", price: 870, order: 2, categoryId: cat["İmzalı Tatlılar"] },
    { nameTr: "Bademli Tart Kek", nameEn: "Almond Tart Cake", descriptionTr: "Bademli tart kek", descriptionEn: "Almond tart cake", price: 870, order: 3, categoryId: cat["İmzalı Tatlılar"] },
    { nameTr: "Beyaz Çikolatalı Haşhaşlı Limonlu Kek", nameEn: "Lemon Poppy Seed White Chocolate Cake", descriptionTr: "Beyaz çikolata, haşhaş ve limon aromalı kek", descriptionEn: "Cake with white chocolate, poppy seed and lemon", price: 870, order: 4, categoryId: cat["İmzalı Tatlılar"] },
    { nameTr: "Çilek Rüyası", nameEn: "Strawberry Dream", descriptionTr: "Çilek temalı imzalı tatlı", descriptionEn: "Signature strawberry dessert", price: 870, order: 5, categoryId: cat["İmzalı Tatlılar"] },
    { nameTr: "Profiterol", nameEn: "Special Profiterole", descriptionTr: "Özel profiterol", descriptionEn: "Special profiterole", price: 870, order: 6, categoryId: cat["İmzalı Tatlılar"] },

    // ── HOUSE COCKTAILS ────────────────────────────────────────────
    { nameTr: "1912", nameEn: "1912", descriptionTr: "Absolut 2cl, Beefeater 2cl, Havana 3 Anos 2cl, Olmeca Silver 2cl, Cointreau 2cl", descriptionEn: "Absolut 2cl, Beefeater 2cl, Havana 3 Anos 2cl, Olmeca Silver 2cl, Cointreau 2cl", price: 1000, order: 1, categoryId: cat["House Cocktails"] },
    { nameTr: "1 İnci", nameEn: "1 İnci", descriptionTr: "Jim Beam 6cl, Ginger Syrup 3cl, Honey Cordial 2cl, Fresh Lime Juice 2cl", descriptionEn: "Jim Beam 6cl, Ginger Syrup 3cl, Honey Cordial 2cl, Fresh Lime Juice 2cl", price: 1050, order: 2, categoryId: cat["House Cocktails"] },
    { nameTr: "Papaya Breeze", nameEn: "Papaya Breeze", descriptionTr: "Bacardi Carta Blanca 6cl, Malibu 2cl, Papaya Püresi 9cl, Fresh Lime Juice 2cl, Grenadine 1cl", descriptionEn: "Bacardi Carta Blanca 6cl, Malibu 2cl, Papaya Puree 9cl, Fresh Lime Juice 2cl, Grenadine 1cl", price: 1000, order: 3, categoryId: cat["House Cocktails"] },
    { nameTr: "No Pain No Gain", nameEn: "No Pain No Gain", descriptionTr: "Havana 3 Anos Rum 5cl, Disaronno Amaretto 2cl, Mint Liqueur 1cl, Citrus Blend 4cl", descriptionEn: "Havana 3 Anos Rum 5cl, Disaronno Amaretto 2cl, Mint Liqueur 1cl, Citrus Blend 4cl", price: 1000, order: 4, categoryId: cat["House Cocktails"] },
    { nameTr: "Bubble Gum", nameEn: "Bubble Gum", descriptionTr: "Beefeater 5cl, St Germain 2cl, Chambord 2cl, Citrus Blend 4cl", descriptionEn: "Beefeater 5cl, St Germain 2cl, Chambord 2cl, Citrus Blend 4cl", price: 1000, order: 5, categoryId: cat["House Cocktails"] },
    { nameTr: "Kiwi Crush", nameEn: "Kiwi Crush", descriptionTr: "Absolut 6cl, Archer's 2cl, Crushed Kiwi, Sorrel Syrup 2cl, Citrus Blend 4cl, Mint Leaves", descriptionEn: "Absolut 6cl, Archer's 2cl, Crushed Kiwi, Sorrel Syrup 2cl, Citrus Blend 4cl, Mint Leaves", price: 1050, order: 6, categoryId: cat["House Cocktails"] },
    { nameTr: "Audrey Hepburn", nameEn: "Audrey Hepburn", descriptionTr: "Beefeater 6cl, Aperol 2cl, Chambord 1cl, Citrus Blend 4cl, Sweet Basil Syrup 4cl", descriptionEn: "Beefeater 6cl, Aperol 2cl, Chambord 1cl, Citrus Blend 4cl, Sweet Basil Syrup 4cl", price: 1000, order: 7, categoryId: cat["House Cocktails"] },
    { nameTr: "Red Flag", nameEn: "Red Flag", descriptionTr: "Bacardi Blanca Rum 5cl, Campari 2cl, Safari 2cl", descriptionEn: "Bacardi Blanca Rum 5cl, Campari 2cl, Safari 2cl", price: 1000, order: 8, categoryId: cat["House Cocktails"] },
    { nameTr: "Make Your Choice", nameEn: "Make Your Choice", descriptionTr: "Chili Pepper İnfused Olmeca Silver 5cl, Cointreau 3cl, Passion Fruit Puree 4cl, Agave Honey 1cl, Citrus Blend 4cl", descriptionEn: "Chili Pepper Infused Olmeca Silver 5cl, Cointreau 3cl, Passion Fruit Puree 4cl, Agave Honey 1cl, Citrus Blend 4cl", price: 1050, order: 9, categoryId: cat["House Cocktails"] },
    { nameTr: "Sweety Home", nameEn: "Sweety Home", descriptionTr: "Fresh Thyme & Strawberry İnfused Absolut 6cl, Lychee Liqueur 3cl, Pineapple Cordial 8cl, Citrus Blend 4cl", descriptionEn: "Fresh Thyme & Strawberry Infused Absolut 6cl, Lychee Liqueur 3cl, Pineapple Cordial 8cl, Citrus Blend 4cl", price: 1050, order: 10, categoryId: cat["House Cocktails"] },
    { nameTr: "Oppenheimer", nameEn: "Oppenheimer", descriptionTr: "Rose İnfused Bulleit Bourbon 6cl, St Germain 3cl, Hibiscus Cordial 4cl, Cranberry Juice 8cl, Citrus Blend 4cl", descriptionEn: "Rose Infused Bulleit Bourbon 6cl, St Germain 3cl, Hibiscus Cordial 4cl, Cranberry Juice 8cl, Citrus Blend 4cl", price: 1050, order: 11, categoryId: cat["House Cocktails"] },
    { nameTr: "Barbie", nameEn: "Barbie", descriptionTr: "Beefeater Pink 5cl, Maraschino 3cl, Cointreau 2cl, Berryhibiscus Cordial 8cl, Citrus Blend 4cl", descriptionEn: "Beefeater Pink 5cl, Maraschino 3cl, Cointreau 2cl, Berryhibiscus Cordial 8cl, Citrus Blend 4cl", price: 1050, order: 12, categoryId: cat["House Cocktails"] },

    // ── INTERNATIONAL COCKTAILS ────────────────────────────────────
    { nameTr: "Caipirinha", nameEn: "Caipirinha", descriptionTr: "Cachaca 8cl, Simple Syrup, Fresh Lime Juice", descriptionEn: "Cachaca 8cl, Simple Syrup, Fresh Lime Juice", price: 1000, order: 1, categoryId: cat["International Cocktails"] },
    { nameTr: "Espresso Martini", nameEn: "Espresso Martini", descriptionTr: "Absolut Vanilla 6cl, Kahlua 3cl, Espresso Shot", descriptionEn: "Absolut Vanilla 6cl, Kahlua 3cl, Espresso Shot", price: 1050, order: 2, categoryId: cat["International Cocktails"] },
    { nameTr: "Penicillin", nameEn: "Penicillin", descriptionTr: "Jim Beam White 6cl, Ginger Syrup 3cl, Honey Cordial 2cl, Fresh Lime Juice 2cl", descriptionEn: "Jim Beam White 6cl, Ginger Syrup 3cl, Honey Cordial 2cl, Fresh Lime Juice 2cl", price: 1050, order: 3, categoryId: cat["International Cocktails"] },
    { nameTr: "Long Island Iced Tea", nameEn: "Long Island Iced Tea", descriptionTr: "Absolut 2cl, Beefeater 2cl, Havana 3 Anos 2cl, Olmeca Silver 2cl, Cointreau 2cl", descriptionEn: "Absolut 2cl, Beefeater 2cl, Havana 3 Anos 2cl, Olmeca Silver 2cl, Cointreau 2cl", price: 1050, order: 4, categoryId: cat["International Cocktails"] },
    { nameTr: "Margarita", nameEn: "Margarita", descriptionTr: "Olmeca Silver 6cl, Cointreau 2cl, Fresh Lime Juice", descriptionEn: "Olmeca Silver 6cl, Cointreau 2cl, Fresh Lime Juice", price: 1050, order: 5, categoryId: cat["International Cocktails"] },
    { nameTr: "Mojito", nameEn: "Mojito", descriptionTr: "Havana 3 Anos 7cl, Fresh Lime Juice, Sparkling Water, Fresh Mint", descriptionEn: "Havana 3 Anos 7cl, Fresh Lime Juice, Sparkling Water, Fresh Mint", price: 1000, order: 6, categoryId: cat["International Cocktails"] },
    { nameTr: "Moscow Mule", nameEn: "Moscow Mule", descriptionTr: "Absolut 5cl, Ginger Soda, Ginger Syrup, Fresh Lime Juice, Fresh Mint", descriptionEn: "Absolut 5cl, Ginger Soda, Ginger Syrup, Fresh Lime Juice, Fresh Mint", price: 1050, order: 7, categoryId: cat["International Cocktails"] },
    { nameTr: "Negroni", nameEn: "Negroni", descriptionTr: "Beefeater 3cl, Campari 3cl, Martini Rosso 3cl", descriptionEn: "Beefeater 3cl, Campari 3cl, Martini Rosso 3cl", price: 1050, order: 8, categoryId: cat["International Cocktails"] },
    { nameTr: "Old Fashioned", nameEn: "Old Fashioned", descriptionTr: "Jim Beam White 5cl, Angostura Bitter 2 Dash, Sugar", descriptionEn: "Jim Beam White 5cl, Angostura Bitter 2 Dash, Sugar", price: 1050, order: 9, categoryId: cat["International Cocktails"] },
    { nameTr: "Pornstar Martini", nameEn: "Pornstar Martini", descriptionTr: "Absolut Vanilla 5cl, Passoa 2cl, Passion Pure, Prosecco Shot", descriptionEn: "Absolut Vanilla 5cl, Passoa 2cl, Passion Pure, Prosecco Shot", price: 1100, order: 10, categoryId: cat["International Cocktails"] },
    { nameTr: "Whiskey Sour", nameEn: "Whiskey Sour", descriptionTr: "Jim Beam White 6cl, Angostura Bitter 2 Dash", descriptionEn: "Jim Beam White 6cl, Angostura Bitter 2 Dash", price: 1050, order: 11, categoryId: cat["International Cocktails"] },

    // ── SPRITZ COCKTAILS ───────────────────────────────────────────
    { nameTr: "French 75", nameEn: "French 75", descriptionTr: "Beefeater Gin 5cl, Simple Syrup 1.5cl, Fresh Lime Juice 1.5cl, Prosecco 8cl", descriptionEn: "Beefeater Gin 5cl, Simple Syrup 1.5cl, Fresh Lime Juice 1.5cl, Prosecco 8cl", price: 1000, order: 1, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Palm Fever", nameEn: "Palm Fever", descriptionTr: "Pineapple İnfused Tequila 8cl, Passionfruit Puree 2cl, Fresh Lime Juice 1cl, Cinnamon Cordial 1cl", descriptionEn: "Pineapple Infused Tequila 8cl, Passionfruit Puree 2cl, Fresh Lime Juice 1cl, Cinnamon Cordial 1cl", price: 1050, order: 2, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Wild Berry Spritz", nameEn: "Wild Berry Spritz", descriptionTr: "Wild Fruits İnfused Lychee Liqueur 6cl, Prosecco 8cl, Sparkling Water", descriptionEn: "Wild Fruits Infused Lychee Liqueur 6cl, Prosecco 8cl, Sparkling Water", price: 1000, order: 3, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Caper's Martini", nameEn: "Caper's Martini", descriptionTr: "Caper's Infused Absolut Vodka 6cl, Vermouth Bianco 2cl, Vermouth Extra Dry 1cl, Caper's Juice 1cl, Olives", descriptionEn: "Caper's Infused Absolut Vodka 6cl, Vermouth Bianco 2cl, Vermouth Extra Dry 1cl, Caper's Juice 1cl, Olives", price: 1050, order: 4, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Limoncello Spritz", nameEn: "Limoncello Spritz", descriptionTr: "Limoncello 6cl, Prosecco 8cl, Sparkling Water", descriptionEn: "Limoncello 6cl, Prosecco 8cl, Sparkling Water", price: 1000, order: 5, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Boteh", nameEn: "Boteh", descriptionTr: "Apricot & Walnut Distilled Bulleit Bourbon 6cl, Southern Comfort 2cl, Honey Cordial 1cl", descriptionEn: "Apricot & Walnut Distilled Bulleit Bourbon 6cl, Southern Comfort 2cl, Honey Cordial 1cl", price: 1500, order: 6, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Campari Spritz", nameEn: "Campari Spritz", descriptionTr: "Campari 6cl, Prosecco 8cl, Sparkling Water", descriptionEn: "Campari 6cl, Prosecco 8cl, Sparkling Water", price: 1000, order: 7, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Aperol Spritz", nameEn: "Aperol Spritz", descriptionTr: "Aperol 6cl, Prosecco 8cl, Sparkling Water", descriptionEn: "Aperol 6cl, Prosecco 8cl, Sparkling Water", price: 1000, order: 8, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Hugo Spritz", nameEn: "Hugo Spritz", descriptionTr: "St. Germain 6cl, Prosecco 8cl, Sparkling Water", descriptionEn: "St. Germain 6cl, Prosecco 8cl, Sparkling Water", price: 1000, order: 9, categoryId: cat["Spritz Cocktails"] },
    { nameTr: "Kir Royale", nameEn: "Kir Royale", descriptionTr: "Prosecco 15cl, Creme De Cassis 2cl", descriptionEn: "Prosecco 15cl, Creme De Cassis 2cl", price: 1000, order: 10, categoryId: cat["Spritz Cocktails"] },

    // ── ALKOLSÜZ KOKTEYL ───────────────────────────────────────────
    { nameTr: "Purple Face", nameEn: "Purple Face", descriptionTr: "Ananas Suyu, Taze Lime Suyu, Mavi Kelebek Çayı, Şeker Şurubu", descriptionEn: "Pineapple Juice, Fresh Lime Juice, Butterfly Pea Tea, Simple Syrup", price: 820, order: 1, categoryId: cat["Alkolsüz Kokteyl"] },
    { nameTr: "Berry Lover", nameEn: "Berry Lover", descriptionTr: "Taze Greyfurt Suyu, Taze Lime Suyu, Berry Hibiskus Şurubu, Şeker Şurubu", descriptionEn: "Fresh Grapefruit Juice, Fresh Lime Juice, Berryhibiscus Cordial, Simple Syrup", price: 820, order: 2, categoryId: cat["Alkolsüz Kokteyl"] },
    { nameTr: "C Plus", nameEn: "C Plus", descriptionTr: "Taze Greyfurt Suyu, Taze Portakal Suyu, Taze Lime Suyu, Şeker Şurubu", descriptionEn: "Fresh Grapefruit Juice, Fresh Orange Juice, Fresh Lime Juice, Simple Syrup", price: 820, order: 3, categoryId: cat["Alkolsüz Kokteyl"] },
    { nameTr: "Virgin Mary", nameEn: "Virgin Mary", descriptionTr: "Taze Domates Suyu, Taze Lime Suyu, Karabiber, Worcestershire Sos, Şili Sos, Tuz", descriptionEn: "Fresh Tomato Juice, Fresh Lime Juice, Black Pepper, Worcestershire Sauce, Hot Chili Sauce, Salt", price: 820, order: 4, categoryId: cat["Alkolsüz Kokteyl"] },
    { nameTr: "Virgin Mojito", nameEn: "Virgin Mojito", descriptionTr: "Nane Yaprakları, Şeker Şurubu, Taze Lime Suyu, Mineralli Su, Sprite", descriptionEn: "Mint Leaves, Simple Syrup, Fresh Lime Juice, Sparkling Water, Sprite", price: 820, order: 5, categoryId: cat["Alkolsüz Kokteyl"] },
    { nameTr: "Passion Drink", nameEn: "Passion Drink", descriptionTr: "Taze Portakal Suyu, Taze Lime Suyu, Çarkıfelek Meyvesi Püresi, Şeker Şurubu", descriptionEn: "Fresh Orange Juice, Fresh Lime Juice, Passion Fruit Puree, Simple Syrup", price: 820, order: 6, categoryId: cat["Alkolsüz Kokteyl"] },

    // ── KIRMIZI ŞARAPLAR ───────────────────────────────────────────
    { nameTr: "Dlc Cabernet Sauvignon-Merlot / Trakya", nameEn: "Dlc Cabernet Sauvignon-Merlot / Thrace", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 1, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Dlc Öküzgözü / Doğu Anadolu", nameEn: "Dlc Öküzgözü / Eastern Anatolia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 2, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Dlc Boğazkere / Güneydoğu Anadolu", nameEn: "Dlc Boğazkere / Southeastern Anatolia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 3, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Dlc Shiraz / Ege Bölgesi", nameEn: "Dlc Shiraz / Aegean Region", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 4, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Dlc Kalecik Karası / İç Anadolu", nameEn: "Dlc Kalecik Karası / Central Anatolia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 5, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Anfora Cabernet Sauvignon / Denizli", nameEn: "Anfora Cabernet Sauvignon / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 6, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Anfora Kalecik Karası / Denizli", nameEn: "Anfora Kalecik Karası / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 7, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Anfora Merlot / Denizli", nameEn: "Anfora Merlot / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 8, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Artı Cabernet Sauvignon-Merlot / Denizli", nameEn: "Artı Cabernet Sauvignon-Merlot / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 9, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Artı Kalecik Karası-Shiraz / Denizli", nameEn: "Artı Kalecik Karası-Shiraz / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 10, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Artı Cabernet Franc / Denizli", nameEn: "Artı Cabernet Franc / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 11, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Nodus Shiraz / Denizli", nameEn: "Nodus Shiraz / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 12, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Nodus Cabernet Franc-Merlot / Denizli", nameEn: "Nodus Cabernet Franc-Merlot / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 13, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Nodus Cabernet Sauvignon / Denizli", nameEn: "Nodus Cabernet Sauvignon / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 14, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Suvla Rezerve Karasakız / Çanakkale", nameEn: "Suvla Rezerve Karasakız / Çanakkale", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4900, order: 15, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Suvla Sur Barrel Aged / Çanakkale", nameEn: "Suvla Sur Barrel Aged / Çanakkale", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4600, order: 16, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Suvla Kabatepe / Çanakkale", nameEn: "Suvla Kabatepe / Çanakkale", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4100, order: 17, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Suvla Sır / Çanakkale", nameEn: "Suvla Sır / Çanakkale", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4500, order: 18, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Sarafin Cabernet Sauvignon / Tekirdağ", nameEn: "Sarafin Cabernet Sauvignon / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 19, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Sarafin Merlot / Tekirdağ", nameEn: "Sarafin Merlot / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 20, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Sarafin Shiraz / Tekirdağ", nameEn: "Sarafin Shiraz / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 21, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Cotes D'avanos Tempranillo / Kapadokya", nameEn: "Cotes D'avanos Tempranillo / Cappadocia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5950, order: 22, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Karma Cabernet Sauvignon-Öküzgözü / Tekirdağ", nameEn: "Karma Cabernet Sauvignon-Öküzgözü / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 23, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Karma Merlot-Boğazkere / Tekirdağ", nameEn: "Karma Merlot-Boğazkere / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 24, categoryId: cat["Kırmızı Şaraplar"] },
    { nameTr: "Karma Shiraz-Boğazkere / Tekirdağ", nameEn: "Karma Shiraz-Boğazkere / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 25, categoryId: cat["Kırmızı Şaraplar"] },

    // ── BEYAZ ŞARAPLAR ─────────────────────────────────────────────
    { nameTr: "Dlc Sultaniye Emir / Ege", nameEn: "Dlc Sultaniye Emir / Aegean", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 1, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Dlc Moscato / İzmir", nameEn: "Dlc Moscato / İzmir", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 2, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Karma Chardonnay-Narince / Denizli", nameEn: "Karma Chardonnay-Narince / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 3, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Dlc Sauvignon Blanc / Trakya", nameEn: "Dlc Sauvignon Blanc / Thrace", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 4, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Dlc Narince / Tokat", nameEn: "Dlc Narince / Tokat", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 5, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Anfora Chardonnay / Denizli", nameEn: "Anfora Chardonnay / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 6, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Anfora Sauvignon Blanc / Denizli", nameEn: "Anfora Sauvignon Blanc / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 7, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Artı Chardonnay Narince / Denizli", nameEn: "Artı Chardonnay Narince / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 8, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Artı Sauvignon Blanc / Denizli", nameEn: "Artı Sauvignon Blanc / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4400, order: 9, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Diren Vadi Narince / Tokat", nameEn: "Diren Vadi Narince / Tokat", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3750, order: 10, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Diren Collection Narince / Tokat", nameEn: "Diren Collection Narince / Tokat", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3750, order: 11, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Diren Collection Chardonnay / Tokat", nameEn: "Diren Collection Chardonnay / Tokat", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3750, order: 12, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Diren Collection Sauvignon Blanc / Tokat", nameEn: "Diren Collection Sauvignon Blanc / Tokat", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3750, order: 13, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Nodus Narince / Denizli", nameEn: "Nodus Narince / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 14, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Nodus Fume Blanc / Denizli", nameEn: "Nodus Fume Blanc / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 15, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Nodus Chardonnay / Denizli", nameEn: "Nodus Chardonnay / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 16, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Sarafin Chardonnay / Tekirdağ", nameEn: "Sarafin Chardonnay / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 17, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Sarafin Sauvignon Blanc / Tekirdağ", nameEn: "Sarafin Sauvignon Blanc / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 18, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Sarafin Fume Blanc / Tekirdağ", nameEn: "Sarafin Fume Blanc / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5300, order: 19, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Cotes D'avanos Sauvignon Blanc / Kapadokya", nameEn: "Cotes D'avanos Sauvignon Blanc / Cappadocia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5950, order: 20, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Cotes D'avanos Chardonnay / Kapadokya", nameEn: "Cotes D'avanos Chardonnay / Cappadocia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5950, order: 21, categoryId: cat["Beyaz Şaraplar"] },
    { nameTr: "Cotes D'avanos Narince / Kapadokya", nameEn: "Cotes D'avanos Narince / Cappadocia", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5950, order: 22, categoryId: cat["Beyaz Şaraplar"] },

    // ── ROSÉ ŞARAPLAR ──────────────────────────────────────────────
    { nameTr: "Verano Blush Grenache / Çanakkale", nameEn: "Verano Blush Grenache / Çanakkale", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 1, categoryId: cat["Rosé Şaraplar"] },
    { nameTr: "Dlc Playa Dömisek Rosé Kalecik Karası / Denizli", nameEn: "Dlc Playa Dömisek Rosé Kalecik Karası / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4300, order: 2, categoryId: cat["Rosé Şaraplar"] },
    { nameTr: "Villa Doluca Rosé Kalecik Karası / Ege", nameEn: "Villa Doluca Rosé Kalecik Karası / Aegean", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 3, categoryId: cat["Rosé Şaraplar"] },
    { nameTr: "Suvla Kabatepe Blush / Çanakkale", nameEn: "Suvla Kabatepe Blush / Çanakkale", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4100, order: 4, categoryId: cat["Rosé Şaraplar"] },
    { nameTr: "Anfora Blush Kalecik Karası-Shiraz / Denizli", nameEn: "Anfora Blush Kalecik Karası-Shiraz / Denizli", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 3900, order: 5, categoryId: cat["Rosé Şaraplar"] },
    { nameTr: "Sarafin Cabernet Franc-Merlot Rosé / Tekirdağ", nameEn: "Sarafin Cabernet Franc-Merlot Rosé / Tekirdağ", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 5100, order: 6, categoryId: cat["Rosé Şaraplar"] },

    // ── ŞAMPANYA & PROSECCO ────────────────────────────────────────
    { nameTr: "Moët & Chandon Rosé Imperial", nameEn: "Moët & Chandon Rosé Imperial", descriptionTr: "Pinot Noir, Pinot Meunier, Chardonnay / Fransa - Şişe (75cl)", descriptionEn: "Pinot Noir, Pinot Meunier, Chardonnay / France - Bottle (75cl)", price: 14500, order: 1, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Moët & Chandon Brut Imperial", nameEn: "Moët & Chandon Brut Imperial", descriptionTr: "Pinot Noir, Pinot Meunier, Chardonnay / Fransa - Şişe (75cl)", descriptionEn: "Pinot Noir, Pinot Meunier, Chardonnay / France - Bottle (75cl)", price: 13500, order: 2, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Moët & Chandon Ice Imperial", nameEn: "Moët & Chandon Ice Imperial", descriptionTr: "Pinot Noir, Pinot Meunier, Chardonnay / Fransa - Şişe (75cl)", descriptionEn: "Pinot Noir, Pinot Meunier, Chardonnay / France - Bottle (75cl)", price: 15500, order: 3, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Dom Perignon Blanc Vintage", nameEn: "Dom Perignon Blanc Vintage", descriptionTr: "Chardonnay, Pinot Noir / Fransa - Şişe (75cl)", descriptionEn: "Chardonnay, Pinot Noir / France - Bottle (75cl)", price: 41000, order: 4, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Bottega Gold", nameEn: "Bottega Gold", descriptionTr: "Glera, Chardonnay, Pinot Noir / İtalya - Şişe (75cl)", descriptionEn: "Glera, Chardonnay, Pinot Noir / Italy - Bottle (75cl)", price: 10500, order: 5, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Bottega Gold Rosé", nameEn: "Bottega Gold Rosé", descriptionTr: "Pinot Nero / İtalya - Şişe (75cl)", descriptionEn: "Pinot Nero / Italy - Bottle (75cl)", price: 10800, order: 6, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Cotes D'avanos Method Traditionelle", nameEn: "Cotes D'avanos Method Traditionelle", descriptionTr: "Emir, Chardonnay / Türkiye - Şişe (75cl)", descriptionEn: "Emir, Chardonnay / Turkey - Bottle (75cl)", price: 9800, order: 7, categoryId: cat["Şampanya & Prosecco"] },
    { nameTr: "Tallero Prosecco / İtalya", nameEn: "Tallero Prosecco / Italy", descriptionTr: "Şişe (75cl)", descriptionEn: "Bottle (75cl)", price: 4150, order: 8, categoryId: cat["Şampanya & Prosecco"] },

    // ── VOTKA ──────────────────────────────────────────────────────
    { nameTr: "Smirnoff Red", nameEn: "Smirnoff Red", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 915, order: 1, categoryId: cat["Votka"] },
    { nameTr: "Absolut Blue", nameEn: "Absolut Blue", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 945, order: 2, categoryId: cat["Votka"] },
    { nameTr: "Haku Japanese Craft Vodka", nameEn: "Haku Japanese Craft Vodka", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1230, order: 3, categoryId: cat["Votka"] },
    { nameTr: "Ketel One", nameEn: "Ketel One", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1160, order: 4, categoryId: cat["Votka"] },
    { nameTr: "Belvedere", nameEn: "Belvedere", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1370, order: 5, categoryId: cat["Votka"] },
    { nameTr: "Grey Goose", nameEn: "Grey Goose", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1305, order: 6, categoryId: cat["Votka"] },
    { nameTr: "Beluga Noble Silver", nameEn: "Beluga Noble Silver", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1380, order: 7, categoryId: cat["Votka"] },
    { nameTr: "Beluga Gold", nameEn: "Beluga Gold", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 2290, order: 8, categoryId: cat["Votka"] },

    // ── CIN ────────────────────────────────────────────────────────
    { nameTr: "Gordon's Gin", nameEn: "Gordon's Gin", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 985, order: 1, categoryId: cat["Cin"] },
    { nameTr: "Bombay Sapphire", nameEn: "Bombay Sapphire", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1090, order: 2, categoryId: cat["Cin"] },
    { nameTr: "Roku Japanese Craft Gin", nameEn: "Roku Japanese Craft Gin", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1125, order: 3, categoryId: cat["Cin"] },
    { nameTr: "Hendrick's", nameEn: "Hendrick's", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1260, order: 4, categoryId: cat["Cin"] },
    { nameTr: "Tanqueray London Dry", nameEn: "Tanqueray London Dry", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1015, order: 5, categoryId: cat["Cin"] },
    { nameTr: "Tanqueray Ten", nameEn: "Tanqueray Ten", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1380, order: 6, categoryId: cat["Cin"] },
    { nameTr: "Monkey 47", nameEn: "Monkey 47", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1235, order: 7, categoryId: cat["Cin"] },

    // ── ROM ────────────────────────────────────────────────────────
    { nameTr: "Havana Club 3 Anos", nameEn: "Havana Club 3 Anos", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1020, order: 1, categoryId: cat["Rom"] },
    { nameTr: "Bacardi Blanca", nameEn: "Bacardi Blanca", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1090, order: 2, categoryId: cat["Rom"] },
    { nameTr: "Havana Club 7 Anos", nameEn: "Havana Club 7 Anos", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1235, order: 3, categoryId: cat["Rom"] },
    { nameTr: "Zacapa 23", nameEn: "Zacapa 23", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1300, order: 4, categoryId: cat["Rom"] },
    { nameTr: "Captain Morgan Spice Gold", nameEn: "Captain Morgan Spice Gold", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1090, order: 5, categoryId: cat["Rom"] },

    // ── TEKİLA & MEZCAL ────────────────────────────────────────────
    { nameTr: "Olmeca Silver", nameEn: "Olmeca Silver", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1040, order: 1, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Olmeca Gold", nameEn: "Olmeca Gold", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1160, order: 2, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Don Julio Blanco", nameEn: "Don Julio Blanco", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1420, order: 3, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Patrón Silver", nameEn: "Patrón Silver", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1450, order: 4, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Patrón Añejo", nameEn: "Patrón Añejo", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1595, order: 5, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Jose Cuervo Reposado", nameEn: "Jose Cuervo Reposado", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1815, order: 6, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Ojo De Tigre Mezcal", nameEn: "Ojo De Tigre Mezcal", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1380, order: 7, categoryId: cat["Tekila & Mezcal"] },
    { nameTr: "Casamigos Mezcal", nameEn: "Casamigos Mezcal", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1305, order: 8, categoryId: cat["Tekila & Mezcal"] },

    // ── VİSKİ ──────────────────────────────────────────────────────
    { nameTr: "Jack Daniel's", nameEn: "Jack Daniel's", descriptionTr: "American - Kadeh (5cl)", descriptionEn: "American - Glass (5cl)", price: 1020, order: 1, categoryId: cat["Viski"] },
    { nameTr: "Jack Daniel's Gentleman", nameEn: "Jack Daniel's Gentleman", descriptionTr: "American - Kadeh (5cl)", descriptionEn: "American - Glass (5cl)", price: 1350, order: 2, categoryId: cat["Viski"] },
    { nameTr: "Maker's Mark", nameEn: "Maker's Mark", descriptionTr: "American Bourbon - Kadeh (5cl)", descriptionEn: "American Bourbon - Glass (5cl)", price: 1380, order: 3, categoryId: cat["Viski"] },
    { nameTr: "Bulleit Bourbon", nameEn: "Bulleit Bourbon", descriptionTr: "American Bourbon - Kadeh (5cl)", descriptionEn: "American Bourbon - Glass (5cl)", price: 1300, order: 4, categoryId: cat["Viski"] },
    { nameTr: "Jameson", nameEn: "Jameson", descriptionTr: "Irish Whiskey - Kadeh (5cl)", descriptionEn: "Irish Whiskey - Glass (5cl)", price: 1160, order: 5, categoryId: cat["Viski"] },
    { nameTr: "Tullamore Dew", nameEn: "Tullamore Dew", descriptionTr: "Irish Whiskey - Kadeh (5cl)", descriptionEn: "Irish Whiskey - Glass (5cl)", price: 1235, order: 6, categoryId: cat["Viski"] },
    { nameTr: "JW Red Label", nameEn: "Johnnie Walker Red Label", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 1020, order: 7, categoryId: cat["Viski"] },
    { nameTr: "JW Black Label", nameEn: "Johnnie Walker Black Label", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 1090, order: 8, categoryId: cat["Viski"] },
    { nameTr: "JW Blue Label", nameEn: "Johnnie Walker Blue Label", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 3190, order: 9, categoryId: cat["Viski"] },
    { nameTr: "Chivas 12 Y.O.", nameEn: "Chivas Regal 12 Y.O.", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 1300, order: 10, categoryId: cat["Viski"] },
    { nameTr: "Chivas 18 Y.O.", nameEn: "Chivas Regal 18 Y.O.", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 1740, order: 11, categoryId: cat["Viski"] },
    { nameTr: "Chivas Royal Salute 21 Y.O.", nameEn: "Chivas Royal Salute 21 Y.O.", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 3340, order: 12, categoryId: cat["Viski"] },
    { nameTr: "Monkey Shoulder", nameEn: "Monkey Shoulder", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 1525, order: 13, categoryId: cat["Viski"] },
    { nameTr: "Dimple Golden Selection", nameEn: "Dimple Golden Selection", descriptionTr: "Scotch Blended - Kadeh (5cl)", descriptionEn: "Scotch Blended - Glass (5cl)", price: 1090, order: 14, categoryId: cat["Viski"] },
    { nameTr: "Hibiki Master Selection", nameEn: "Hibiki Master Selection", descriptionTr: "Japanese - Kadeh (5cl)", descriptionEn: "Japanese - Glass (5cl)", price: 1960, order: 15, categoryId: cat["Viski"] },
    { nameTr: "Glenfiddich 12 Y.O.", nameEn: "Glenfiddich 12 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 1525, order: 16, categoryId: cat["Viski"] },
    { nameTr: "Glenfiddich 18 Y.O.", nameEn: "Glenfiddich 18 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 2320, order: 17, categoryId: cat["Viski"] },
    { nameTr: "The Glenlivet 15 Y.O.", nameEn: "The Glenlivet 15 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 1800, order: 18, categoryId: cat["Viski"] },
    { nameTr: "The Macallan Double Cask 12 Y.O.", nameEn: "The Macallan Double Cask 12 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 2110, order: 19, categoryId: cat["Viski"] },
    { nameTr: "Lagavulin 8 Y.O.", nameEn: "Lagavulin 8 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 1885, order: 20, categoryId: cat["Viski"] },
    { nameTr: "Lagavulin 16 Y.O.", nameEn: "Lagavulin 16 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 2465, order: 21, categoryId: cat["Viski"] },
    { nameTr: "Glenmorangie Original 10 Y.O.", nameEn: "Glenmorangie Original 10 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 1380, order: 22, categoryId: cat["Viski"] },
    { nameTr: "Glenmorangie Lasanta 12 Y.O.", nameEn: "Glenmorangie Lasanta 12 Y.O. Sherry Cask", descriptionTr: "Single Malt Sherry Cask Finish - Kadeh (5cl)", descriptionEn: "Single Malt Sherry Cask Finish - Glass (5cl)", price: 1960, order: 23, categoryId: cat["Viski"] },
    { nameTr: "Talisker 10 Y.O.", nameEn: "Talisker 10 Y.O.", descriptionTr: "Single Malt - Kadeh (5cl)", descriptionEn: "Single Malt - Glass (5cl)", price: 1885, order: 24, categoryId: cat["Viski"] },

    // ── KONYAK & BRENDİ ────────────────────────────────────────────
    { nameTr: "Hennessy V.S.", nameEn: "Hennessy V.S.", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 2250, order: 1, categoryId: cat["Konyak & Brendi"] },
    { nameTr: "Hennessy V.S.O.P.", nameEn: "Hennessy V.S.O.P.", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 2610, order: 2, categoryId: cat["Konyak & Brendi"] },
    { nameTr: "Hennessy X.O.", nameEn: "Hennessy X.O.", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 3190, order: 3, categoryId: cat["Konyak & Brendi"] },
    { nameTr: "Metaxa 5", nameEn: "Metaxa 5", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1305, order: 4, categoryId: cat["Konyak & Brendi"] },
    { nameTr: "Kappa Pisco", nameEn: "Kappa Pisco", descriptionTr: "Kadeh (5cl)", descriptionEn: "Glass (5cl)", price: 1305, order: 5, categoryId: cat["Konyak & Brendi"] },

    // ── SOĞUK İÇECEKLER ───────────────────────────────────────────
    { nameTr: "Cool Lime", nameEn: "Cool Lime", descriptionTr: "Serinletici lime içeceği", descriptionEn: "Refreshing lime drink", price: 580, order: 1, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Mexican Churchill", nameEn: "Mexican Churchill", descriptionTr: "Özel karışık soğuk içecek", descriptionEn: "Special mixed cold drink", price: 420, order: 2, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Coca Cola 330ml", nameEn: "Coca Cola 330ml", descriptionTr: "", descriptionEn: "", price: 300, order: 3, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Coca Cola Zero 330ml", nameEn: "Coca Cola Zero 330ml", descriptionTr: "", descriptionEn: "", price: 300, order: 4, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Sprite 330ml", nameEn: "Sprite 330ml", descriptionTr: "", descriptionEn: "", price: 300, order: 5, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Fanta 330ml", nameEn: "Fanta 330ml", descriptionTr: "", descriptionEn: "", price: 300, order: 6, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Cappy Meyve Suyu 200ml", nameEn: "Cappy Fruit Juice 200ml", descriptionTr: "", descriptionEn: "", price: 300, order: 7, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Fuse Tea Şeftali 250ml", nameEn: "Fuse Tea Peach 250ml", descriptionTr: "", descriptionEn: "", price: 300, order: 8, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Fuse Tea Limon 250ml", nameEn: "Fuse Tea Lemon 250ml", descriptionTr: "", descriptionEn: "", price: 300, order: 9, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Red Bull 250ml", nameEn: "Red Bull 250ml", descriptionTr: "", descriptionEn: "", price: 450, order: 10, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Ayran 330ml", nameEn: "Ayran 330ml", descriptionTr: "Geleneksel Türk yoğurt içeceği", descriptionEn: "Traditional Turkish yogurt drink", price: 300, order: 11, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Limonata 330ml", nameEn: "Lemonade 330ml", descriptionTr: "", descriptionEn: "", price: 350, order: 12, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Schweppes Tonik 250ml", nameEn: "Schweppes Tonic 250ml", descriptionTr: "", descriptionEn: "", price: 350, order: 13, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "San Pellegrino 250ml", nameEn: "San Pellegrino 250ml", descriptionTr: "", descriptionEn: "", price: 300, order: 14, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "San Pellegrino 750ml", nameEn: "San Pellegrino 750ml", descriptionTr: "", descriptionEn: "", price: 500, order: 15, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Uludağ Şişe Su 330ml", nameEn: "Uludağ Water 330ml", descriptionTr: "", descriptionEn: "", price: 250, order: 16, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Uludağ Şişe Su 750ml", nameEn: "Uludağ Water 750ml", descriptionTr: "", descriptionEn: "", price: 400, order: 17, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Uludağ Premium Soda 330ml", nameEn: "Uludağ Premium Soda 330ml", descriptionTr: "", descriptionEn: "", price: 260, order: 18, categoryId: cat["Soğuk İçecekler"] },
    { nameTr: "Uludağ Premium Soda 750ml", nameEn: "Uludağ Premium Soda 750ml", descriptionTr: "", descriptionEn: "", price: 420, order: 19, categoryId: cat["Soğuk İçecekler"] },

    // ── KAHVELER ───────────────────────────────────────────────────
    { nameTr: "Single Espresso", nameEn: "Single Espresso", descriptionTr: "", descriptionEn: "", price: 290, order: 1, categoryId: cat["Kahveler"] },
    { nameTr: "Double Espresso", nameEn: "Double Espresso", descriptionTr: "", descriptionEn: "", price: 350, order: 2, categoryId: cat["Kahveler"] },
    { nameTr: "Espresso Macchiato", nameEn: "Espresso Macchiato", descriptionTr: "", descriptionEn: "", price: 350, order: 3, categoryId: cat["Kahveler"] },
    { nameTr: "Coffee Latte", nameEn: "Coffee Latte", descriptionTr: "", descriptionEn: "", price: 390, order: 4, categoryId: cat["Kahveler"] },
    { nameTr: "Latte Macchiato", nameEn: "Latte Macchiato", descriptionTr: "", descriptionEn: "", price: 390, order: 5, categoryId: cat["Kahveler"] },
    { nameTr: "Caramel Macchiato", nameEn: "Caramel Macchiato", descriptionTr: "", descriptionEn: "", price: 450, order: 6, categoryId: cat["Kahveler"] },
    { nameTr: "Sıcak Çikolata", nameEn: "Hot Chocolate", descriptionTr: "", descriptionEn: "", price: 420, order: 7, categoryId: cat["Kahveler"] },
    { nameTr: "Salep", nameEn: "Sahlep", descriptionTr: "", descriptionEn: "", price: 420, order: 8, categoryId: cat["Kahveler"] },
    { nameTr: "Mocha", nameEn: "Mocha", descriptionTr: "", descriptionEn: "", price: 420, order: 9, categoryId: cat["Kahveler"] },
    { nameTr: "Flat White", nameEn: "Flat White", descriptionTr: "", descriptionEn: "", price: 430, order: 10, categoryId: cat["Kahveler"] },
    { nameTr: "Cappuccino", nameEn: "Cappuccino", descriptionTr: "", descriptionEn: "", price: 410, order: 11, categoryId: cat["Kahveler"] },
    { nameTr: "Americano", nameEn: "Americano", descriptionTr: "", descriptionEn: "", price: 380, order: 12, categoryId: cat["Kahveler"] },
    { nameTr: "Cortado", nameEn: "Cortado", descriptionTr: "", descriptionEn: "", price: 390, order: 13, categoryId: cat["Kahveler"] },
    { nameTr: "Filtre Kahve", nameEn: "Filter Coffee", descriptionTr: "", descriptionEn: "", price: 360, order: 14, categoryId: cat["Kahveler"] },
    { nameTr: "Türk Kahvesi", nameEn: "Turkish Coffee", descriptionTr: "", descriptionEn: "", price: 300, order: 15, categoryId: cat["Kahveler"] },
    { nameTr: "Double Türk Kahvesi", nameEn: "Double Turkish Coffee", descriptionTr: "", descriptionEn: "", price: 400, order: 16, categoryId: cat["Kahveler"] },
    { nameTr: "Ice Latte", nameEn: "Ice Latte", descriptionTr: "", descriptionEn: "", price: 420, order: 17, categoryId: cat["Kahveler"] },
    { nameTr: "Ice Americano", nameEn: "Ice Americano", descriptionTr: "", descriptionEn: "", price: 420, order: 18, categoryId: cat["Kahveler"] },
    { nameTr: "Ice Caramel Macchiato", nameEn: "Ice Caramel Macchiato", descriptionTr: "", descriptionEn: "", price: 450, order: 19, categoryId: cat["Kahveler"] },
    { nameTr: "Ice Mocha", nameEn: "Ice Mocha", descriptionTr: "", descriptionEn: "", price: 450, order: 20, categoryId: cat["Kahveler"] },

    // ── ÇAY & BİTKİ ÇAYLARI ───────────────────────────────────────
    { nameTr: "Çay", nameEn: "Tea", descriptionTr: "", descriptionEn: "", price: 170, order: 1, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Fincan Çay", nameEn: "Cup Of Tea", descriptionTr: "", descriptionEn: "", price: 220, order: 2, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Ihlamur", nameEn: "Linden Tea", descriptionTr: "", descriptionEn: "", price: 400, order: 3, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Papatya", nameEn: "Daisy Tea", descriptionTr: "", descriptionEn: "", price: 400, order: 4, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Kış Çayı", nameEn: "Winter Tea", descriptionTr: "", descriptionEn: "", price: 400, order: 5, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Elma Çayı", nameEn: "Apple Tea", descriptionTr: "", descriptionEn: "", price: 400, order: 6, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Ada Çayı", nameEn: "Sage Tea", descriptionTr: "", descriptionEn: "", price: 400, order: 7, categoryId: cat["Çay & Bitki Çayları"] },
    { nameTr: "Taze Nane Çayı", nameEn: "Fresh Mint Tea", descriptionTr: "", descriptionEn: "", price: 400, order: 8, categoryId: cat["Çay & Bitki Çayları"] },

    // ── TAZE MEYVE SULARI ──────────────────────────────────────────
    { nameTr: "Portakal Suyu 330ml", nameEn: "Orange Juice 330ml", descriptionTr: "Taze sıkılmış", descriptionEn: "Freshly squeezed", price: 470, order: 1, categoryId: cat["Taze Meyve Suları"] },
    { nameTr: "Elma Suyu 330ml", nameEn: "Apple Juice 330ml", descriptionTr: "Taze sıkılmış", descriptionEn: "Freshly squeezed", price: 470, order: 2, categoryId: cat["Taze Meyve Suları"] },
    { nameTr: "Nar Suyu 330ml", nameEn: "Pomegranate Juice 330ml", descriptionTr: "Taze sıkılmış", descriptionEn: "Freshly squeezed", price: 470, order: 3, categoryId: cat["Taze Meyve Suları"] },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { nameTr: product.nameTr } });
    if (!existing) {
      await prisma.product.create({
        data: {
          ...product,
          available: true,
          image: null,
        },
      });
    }
  }

  console.log(`Seeding completed! ${products.length} products, ${categoryData.length} categories.`);
  console.log("Admin: admin@sirkecilokantas.com / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
