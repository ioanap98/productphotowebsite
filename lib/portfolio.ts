import media from "@/.generated/portfolio.json";

export type PortfolioCategory =
  | "Beauty & skincare"
  | "Wellness & supplements"
  | "Lifestyle"
  | "Video & motion"
  | "More work";
export type PortfolioMedia = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  filename: string;
  title: string;
  alt: string;
  category: PortfolioCategory;
};
const descriptions: Record<string, [string, string, PortfolioCategory]> = {
  "2.PNG": [
    "A playful balance",
    "Four jars of chickpea and hazelnut spreads balanced against peach",
    "Lifestyle",
  ],
  "3 copy.PNG": [
    "The full collection",
    "Hand arranging colourful spread jars against peach",
    "Lifestyle",
  ],
  "4.PNG": [
    "Crunch & texture",
    "Spoon of crunchy quinoa and hazelnut spread above an open jar",
    "Lifestyle",
  ],
  "5 copy.PNG": [
    "Rich in detail",
    "Spoon of roasted chickpea and hazelnut spread above its jar",
    "Lifestyle",
  ],
  "6.PNG": [
    "A ribbon of flavour",
    "Cinnamon chickpea spread flowing from a spoon into a jar",
    "Lifestyle",
  ],
  "7.PNG": [
    "The perfect pour",
    "Roasted chickpea and espresso spread on a spoon above a jar",
    "Lifestyle",
  ],
  "8.PNG": [
    "Four flavours, from above",
    "Flat lay of four open spread jars showing different textures",
    "Lifestyle",
  ],
  "9.PNG": [
    "The breakfast moment",
    "Chickpea spread beside a breakfast bowl with fruit",
    "Lifestyle",
  ],
  "41332fac-1175-4bad-8991-76a0b7614d0f.JPG": [
    "The supplement story",
    "Supplement bottles and golden capsules on a cream and white set",
    "Wellness & supplements",
  ],
  "DSC_4551.PNG": [
    "Quiet form",
    "White cosmetic tube casting a soft shadow on a pale background",
    "Beauty & skincare",
  ],
  "DSC_4809.PNG": [
    "A focus on wellness",
    "Supplement bottles and golden capsules photographed with shallow depth of field",
    "Wellness & supplements",
  ],
  "DSC_4810.PNG": [
    "In the foreground",
    "A close composition of supplement bottles and capsules",
    "Wellness & supplements",
  ],
  "DSC_5046-Edit.PNG": [
    "A drop of colour",
    "Amber skincare dropper bottle with a yellow label on peach",
    "Beauty & skincare",
  ],
  "DSC_5047-Edit.PNG": [
    "A considered pair",
    "Amber skincare dropper bottle beside its yellow carton",
    "Beauty & skincare",
  ],
  "DSC_5281-Edit.PNG": [
    "The skincare shelf",
    "Cosmetic bottles and jars arranged on glass shelves",
    "Beauty & skincare",
  ],
  "IMG_1411.PNG": [
    "Air & texture",
    "White cleansing mousse bottle styled with soft foam on peach",
    "Beauty & skincare",
  ],
  "IMG_1411.jpg": [
    "The cleansing ritual",
    "Cleansing product photography in a soft studio setting",
    "Beauty & skincare",
  ],
  "IMG_1441.PNG": [
    "A complete ritual",
    "A collection of skincare products on a peach and white studio set",
    "Beauty & skincare",
  ],
  "IMG_1442.PNG": [
    "Light on the skin",
    "White skincare bottle with a drop of product on a white plinth",
    "Beauty & skincare",
  ],
  "IMG_1443.PNG": [
    "A little precision",
    "Skincare serum bottle with its pipette suspended above it",
    "Beauty & skincare",
  ],
  "IMG_1444.PNG": [
    "The skincare trio",
    "Three white skincare bottles arranged around a central mousse bottle",
    "Beauty & skincare",
  ],
  "IMG_2835.PNG": [
    "A sculptural collection",
    "Three dark brown skincare cartons on a warm neutral set",
    "Beauty & skincare",
  ],
  "IMG_2836.PNG": [
    "The balancing act",
    "Gold skincare bottle on a white plinth with a floating brown carton",
    "Beauty & skincare",
  ],
  "IMG_2837.PNG": [
    "Golden detail",
    "Gold skincare bottle with its cap and a drop of serum",
    "Beauty & skincare",
  ],
  "IMG_2838.PNG": [
    "An elegant silhouette",
    "Gold skincare spray bottle standing beside its cap",
    "Beauty & skincare",
  ],
  "IMG_2839.PNG": [
    "One visual world",
    "Gold skincare bottles and dark brown cartons in a coordinated collection",
    "Beauty & skincare",
  ],
  "Untitled-1.PNG": [
    "A complete routine",
    "A collection of neutral cosmetic tubes, bottles and jars on peach",
    "Beauty & skincare",
  ],
  "Untitled-4.PNG": [
    "Wellness in balance",
    "Two supplement bottles with golden capsules on a pale plinth",
    "Wellness & supplements",
  ],
  "Untitled-5.PNG": [
    "Capsules in motion",
    "Supplement bottle with its lid and golden capsules suspended above it",
    "Wellness & supplements",
  ],
  "Untitled-6.PNG": [
    "A clear line-up",
    "Three supplement bottles arranged diagonally with loose capsules",
    "Wellness & supplements",
  ],
  "DSC_5449.mov": [
    "Product film 01",
    "Creative product video by Epitome Creatives",
    "Video & motion",
  ],
  "DSC_5454.mov": [
    "Product film 02",
    "Creative product video by Epitome Creatives",
    "Video & motion",
  ],
  "gif beauty.mp4": [
    "Beauty in motion",
    "One Tribe cleanser product animation on a blush pink set",
    "Video & motion",
  ],
  "gif food supplement.mp4": [
    "Supplements in motion",
    "ALI9NED Hi Skin supplement bottle animation on a warm cream set",
    "Video & motion",
  ],
  "0.png": [
    "Light & reflection",
    "Rituals shampoo surrounded by iridescent reflections on a pink set",
    "Beauty & skincare",
  ],
  "0A.png": [
    "Beauty in the detail",
    "Cupio cuticle oil and pipette on a blush pink product photography set",
    "Beauty & skincare",
  ],
  "0B.png": [
    "A daily ritual",
    "Liquid supplement being poured from a bottle against a green background",
    "Wellness & supplements",
  ],
  "01.jpg": [
    "Form & balance",
    "Magnesium supplement bottle suspended beside a ribbon and circular prop",
    "Wellness & supplements",
  ],
  "011.jpg": [
    "Out in the light",
    "Collagen, multivitamin and magnesium supplements photographed outdoors",
    "Wellness & supplements",
  ],
  "02.jpg": [
    "Soft light, strong presence",
    "Rituals shimmering body oil on a softly lit pink background",
    "Beauty & skincare",
  ],
  "02A.jpg": [
    "Texture study",
    "Stacked chocolate flapjack pieces on a plinth against coral pink",
    "Lifestyle",
  ],
  "03.jpg": [
    "Clean essentials",
    "Manicure product bottles arranged on a pink studio set",
    "Beauty & skincare",
  ],
  "04.png": [
    "A considered composition",
    "Magnesium supplement bottles and tablets styled on white plinths",
    "Wellness & supplements",
  ],
  "05.jpg": [
    "Cream & texture",
    "Open cosmetic jar on a softly lit pink surface",
    "Beauty & skincare",
  ],
  "05A.jpg": [
    "Colour & flavour",
    "Protein flapjack packaging with stacked chocolate pieces against pink",
    "Lifestyle",
  ],
  "06.png": [
    "The skincare line-up",
    "Q+A vitamin C and niacinamide skincare arranged on a white plinth against yellow",
    "Beauty & skincare",
  ],
  "07.png": [
    "A tactile ritual",
    "Rituals product tube beside a small mound of powder on pink tiles",
    "Beauty & skincare",
  ],
  "11.png": [
    "Everyday luxury",
    "Gold moisturiser jar photographed in a softly blurred interior",
    "Beauty & skincare",
  ],
  "11a.png": [
    "The hero shot",
    "Cupio cuticle oil bottle on a clean pink and white studio background",
    "Beauty & skincare",
  ],
  "12.png": [
    "At the table",
    "Magnesium supplements styled beside a meal and cutlery",
    "Wellness & supplements",
  ],
  "13.png": [
    "Pattern & repetition",
    "Vital Proteins collagen tubs arranged in a repeating pattern on blue",
    "Wellness & supplements",
  ],
  "14.jpg": [
    "A colourful pair",
    "Protein snack bars stacked on a plinth against a pink background",
    "Lifestyle",
  ],
  "15.jpg": [
    "Wellness together",
    "Three supplement bottles arranged against a green textured backdrop",
    "Wellness & supplements",
  ],
  "16.jpg": [
    "Naturally styled",
    "Adaptogen supplement bottle with fresh blueberries and leaves",
    "Wellness & supplements",
  ],
  "17.jpg": [
    "Softness & science",
    "The Ordinary skincare bottle and carton styled on burgundy fabric",
    "Beauty & skincare",
  ],
  "18.jpg": [
    "The finer details",
    "Supplement bottle on its side with capsules on a pale surface",
    "Wellness & supplements",
  ],
  "19.png": [
    "Wellness, in hand",
    "Hand holding a Vital Proteins collagen tub in natural outdoor light",
    "Wellness & supplements",
  ],
  "19a.png": [
    "An everyday setting",
    "Magnesium supplement bottle with a glass of water in a kitchen",
    "Wellness & supplements",
  ],
  "192.png": [
    "A balanced line-up",
    "Three supplement bottles leaning together on a white surface",
    "Wellness & supplements",
  ],
  "193.png": [
    "A moment of calm",
    "Incense sticks with a delicate trail of smoke against a dark background",
    "Lifestyle",
  ],
  "194.png": [
    "Every drop matters",
    "The Ordinary serum pipette suspended above an amber bottle",
    "Beauty & skincare",
  ],
  "195.png": [
    "From above",
    "Magnesium supplement bottle, lid and capsules in a pink flat lay",
    "Wellness & supplements",
  ],
  "196.png": [
    "In the green",
    "Chlorofresh liquid chlorophyll bottle nestled among outdoor foliage",
    "Wellness & supplements",
  ],
  "197.png": [
    "Quiet essentials",
    "White fragrance packaging styled with incense sticks",
    "Lifestyle",
  ],
  "198.png": [
    "In good company",
    "Hands arranging a group of supplement bottles against a muted background",
    "Wellness & supplements",
  ],
  "20.png": [
    "Skincare, in hand",
    "Hand holding Q+A niacinamide serum beside its carton on yellow",
    "Beauty & skincare",
  ],
  "200.png": [
    "A fresh perspective",
    "Hand holding Chlorofresh liquid chlorophyll beside a glass against green",
    "Wellness & supplements",
  ],
  "21.jpg": [
    "A little radiance",
    "Hand presenting a gold moisturiser jar against warm out-of-focus lights",
    "Beauty & skincare",
  ],
  "22.png": [
    "Fresh & considered",
    "The Ordinary serum and carton balanced on pale green geometric props",
    "Beauty & skincare",
  ],
  "3.png": [
    "Colour with purpose",
    "Two Q+A skincare bottles tilted against a bright yellow studio background",
    "Beauty & skincare",
  ],
  "5.png": [
    "Freshly poured",
    "Chlorofresh bottle and a glass of green liquid with ice on a green set",
    "Wellness & supplements",
  ],
  "DSC_0743.jpg": [
    "Light & shadow",
    "The Ordinary serum bottle among leaves and patterned shadows",
    "Beauty & skincare",
  ],
  "DSC_1129-1.jpg": [
    "An ingredient story",
    "Adaptogen supplement bottle standing above a selection of capsules",
    "Wellness & supplements",
  ],
  "DSC_3584-Edit.jpg": [
    "Simple, striking",
    "Magnesium supplement bottle casting a shadow on a pink background",
    "Wellness & supplements",
  ],
};
export async function getPortfolioMedia(): Promise<PortfolioMedia[]> {
  return media.map((asset, index) => {
    const { filename } = asset;
    const kind = asset.kind === "video" ? "video" : "image";
    const [title, alt, category] = descriptions[filename] || [
      `${kind === "video" ? "Product film" : "Product study"} ${index + 1}`,
      `${kind === "video" ? "Product video" : "Creative product photography"} by Epitome Creatives`,
      kind === "video" ? "Video & motion" : "More work",
    ];
    return { ...asset, kind, title, alt, category };
  });
}
