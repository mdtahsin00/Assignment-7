# 🛒 বাজার দর | BazarDor

### বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন এক নজরে

**BazarDor** is a responsive web application that helps users explore the prices of essential daily products in Bangladesh. It provides an overview of current product prices, price increases and decreases, category-based browsing, and market-wise price comparisons through a clean and user-friendly interface.

The platform also includes user authentication, protected product details, and profile management to provide a personalized experience.

---

## ✨ Key Features

1. **📊 Real-Time Price Overview** — Explore product prices, price changes, and daily market trends, including products with rising and falling prices.

2. **🛍️ Product & Category Browsing** — Browse essential products through responsive cards, explore categories, and sort products by price in ascending or descending order.

3. **📈 Detailed Product Information** — View product descriptions, minimum, maximum, and average prices, along with market-wise price comparisons.

4. **🔐 Secure Authentication** — Register and sign in using email and password or supported Google and GitHub social login providers. Access protected product details and manage your profile.

5. **📱 Responsive & User-Friendly Interface** — Enjoy a mobile-friendly design with an interactive navigation bar, scrolling price ticker, loading skeletons, toast notifications, and custom error pages.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Application development and server-side rendering |
| Next.js App Router | Routing, dynamic pages, and layouts |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and UI design |
| DaisyUI / UI Component Library | Reusable interface components |
| Better Auth | Authentication and session management |
| React Hot Toast | Success, error, and status notifications |
| JSON / API | Product data management and retrieval |
| Vercel | Application deployment and hosting |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm, pnpm, or yarn
- Git

### Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd bazardor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory and add the environment variables required by your Better Auth configuration, database, and authentication providers.

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Add your database and OAuth credentials
# according to your project configuration.
```

Never commit real secrets, passwords, or OAuth credentials to GitHub.

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Core Application Routes

| Route | Description |
|---|---|
| `/` | Homepage with market trends and product listings |
| `/category/[slug]` | Category-specific product listings and sorting |
| `/product/[slug]` | Detailed product information and market prices |
| `/signin` | User login |
| `/signup` | User registration |
| `/profile` | User profile information |
| `/profile/update` | Update user information |

Unknown or invalid routes should display a friendly 404 page with a link back to the homepage.

---

## 📱 Responsive Design

BazarDor is designed to work across:

- Desktop computers
- Tablets
- Mobile devices

The layout adapts to different screen sizes with responsive product grids, a flexible navigation bar, a scrolling price ticker, and a hero section that stacks on smaller screens.

---

## 🌐 Deployment

The application can be deployed using [Vercel](https://vercel.com/), which supports Next.js applications.

Before deployment:

1. Configure production environment variables.
2. Verify authentication and database configuration.
3. Test dynamic routes and protected pages.
4. Run the production build.

```bash
npm run build
npm run start
```

---

## ⚠️ Disclaimer

Product prices displayed on BazarDor are indicative and may vary depending on the market, location, product quality, and supply conditions. Prices should not be considered guaranteed quotations.

---

## 👨‍💻 Project Information

**Project Name:** বাজার দর (BazarDor)  
**Project Type:** Market Price Tracking Web Application  
**Primary Goal:** Make essential product price information easier to explore and compare in Bangladesh.

---

*Built with ❤️ to make everyday market price information easier to access.*
