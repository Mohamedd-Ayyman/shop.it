import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-text-muted">
        <p className="mb-2">&copy; {new Date().getFullYear()} Shop.it. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <Link to="/shop/products" className="hover:text-white transition">Products</Link>
          <Link to="/shop/cart" className="hover:text-white transition">Cart</Link>
        </div>
      </div>
    </footer>
  )
}
