# CREV Website

The CREV Website serves as the front-end interface for the [crev cli](https://github.com/vossenwout/crev), an AI-driven code review tool. This website allows users to sign up using firebase, view documentation and pricing, and buy / manage their subscription using Stripe.

## Technologies 

- **Next.js:** A React framework for server-side rendering and static site generation.
- **TypeScript:** Strongly typed programming language for enhanced code quality and maintainability.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Firebase:** Backend-as-a-Service for authentication, database, and hosting.
- **Stripe:** Payment processing for managing subscriptions and payments.
- **GitHub Actions:** CI/CD pipelines for automated building and deployment.

## Deployment

Deployment is handled automatically through GitHub Actions. The workflow is configured to build and deploy the site to Firebase Hosting whenever changes are pushed to the `main` branch.

- **Main Branch:** Pushing to the `main` branch triggers the GitHub Action to build and deploy the site to Firebase Hosting.
- **Merge Requests:** Merge requests are automatically deployed to a preview environment for testing and review.

## Local Development

Follow these instructions to set up the project locally.


### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/crev-website.git
   cd crev-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

Create a `.env.local` file in the root directory and define the necessary environment variables. You will need to set up your own Firebase project and Stripe account to obtain these values.

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Stripe Configuration
NEXT_PUBLIC_CHECKOUT_SUCCESS_URL=your_checkout_success_url
NEXT_PUBLIC_CHECKOUT_CANCEL_URL=your_checkout_cancel_url
NEXT_PUBLIC_PORTAL_RETURN_URL=your_portal_return_url
NEXT_PUBLIC_HOBBY_PLAN_PRICE_ID=your_hobby_plan_price_id
NEXT_PUBLIC_PREMIUM_PLAN_PRICE_ID=your_premium_plan_price_id
NEXT_PUBLIC_PRO_PLAN_PRICE_ID=your_pro_plan_price_id
```

### Running Locally

After configuring the environment variables, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.



## Contact

For any feedback, please contact [vossen.w@hotmail.com](mailto:your.email@example.com).

---

*Thank you for checking out the CREV Website repository!*