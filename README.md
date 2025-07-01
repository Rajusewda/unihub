# UniHub - Collaborative Study Notes Platform

A real-time collaborative platform for students to share, discover, and discuss study notes across Indian universities.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/unihub&env=DATABASE_URL&envDescription=Database%20connection%20string%20from%20Neon&envLink=https://neon.tech)

## ✨ Features

- 📚 **Note Sharing**: Upload and download study materials
- 💬 **Real-time Discussions**: Engage with the community  
- 🎯 **Request System**: Request specific notes with bounties
- ⭐ **Voting & Bookmarks**: Rate and save your favorite content
- 🔍 **Advanced Search**: Find notes by subject, university, or tags
- 📊 **Live Dashboard**: Real-time statistics and trending topics
- 🇮🇳 **Indian Universities**: Comprehensive list of Indian institutions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, Neon PostgreSQL
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- A [Neon](https://neon.tech) database (free tier available)
- A [Vercel](https://vercel.com) account (free tier available)

## 🚀 Deployment Steps

### Method 1: One-Click Deploy
1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Set up your Neon database:
   - Go to [Neon.tech](https://neon.tech) and create a free account
   - Create a new database
   - Copy the connection string
4. Add the `DATABASE_URL` environment variable in Vercel
5. Deploy! 🎉

### Method 2: Manual Deploy

#### Step 1: Clone and Setup
\`\`\`bash
git clone https://github.com/yourusername/unihub.git
cd unihub
npm install
\`\`\`

#### Step 2: Database Setup
1. Create a [Neon](https://neon.tech) account (free)
2. Create a new database
3. Copy your connection string
4. Create \`.env.local\`:
\`\`\`env
DATABASE_URL="postgresql://username:password@hostname:port/database"
\`\`\`

#### Step 3: Initialize Database
\`\`\`bash
npm run build
# Database will be initialized automatically on first run
\`\`\`

#### Step 4: Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`DATABASE_URL\` | Neon PostgreSQL connection string | Yes |
| \`BLOB_READ_WRITE_TOKEN\` | Vercel Blob token for file uploads | Optional |
| \`NEXTAUTH_SECRET\` | NextAuth.js secret for authentication | Optional |

## 🏃‍♂️ Local Development

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your DATABASE_URL

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

\`\`\`
unihub/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   └── (pages)/           # App pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── scripts/              # Database scripts
└── public/               # Static assets
\`\`\`

## 🌟 Key Features Explained

### For Students
- **Upload Notes**: Share your study materials with the community
- **Browse & Download**: Access notes from students across India
- **Discussion Forums**: Ask questions and help others
- **Request System**: Request specific notes with bounty rewards
- **Bookmarking**: Save your favorite notes for later

### For Universities
- **University-specific**: Filter content by your institution
- **Subject Organization**: Well-organized by academic subjects
- **Quality Control**: Community voting ensures high-quality content

## 🔒 Security & Privacy

- All uploads are validated for file type and size
- User authentication and authorization
- Rate limiting on API endpoints
- Secure database connections
- No sensitive data exposure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@unihub.com
- 💬 Discord: [Join our community](https://discord.gg/unihub)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/unihub/issues)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database powered by [Neon](https://neon.tech)
- Deployed on [Vercel](https://vercel.com)

---

Made with ❤️ for Indian students by the UniHub team
