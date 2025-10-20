
export const metadata = {
  title: 'Recipe Book',
  description: 'A platform to store and display your favorite recipes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}