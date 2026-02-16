"use client"
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Settings, Plus, Trash2, Menu, LogIn, Lock, ShoppingCart, Home, Info, Phone, MapPin, Send, ExternalLink, Sparkles } from 'lucide-react';

// TypeScript Interface
interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
}

export default function RimshaNeonHandicrafts() {
  const [view, setView] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState('admin123');
  const [inputPass, setInputPass] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedProds = localStorage.getItem('rimsha_products');
    const savedCart = localStorage.getItem('rimsha_cart');
    const savedPass = localStorage.getItem('rimsha_pass');
    if (savedProds) setProducts(JSON.parse(savedProds));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedPass) setAdminPass(savedPass);
  }, []);

  if (!isMounted) return null;

  const saveProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('rimsha_products', JSON.stringify(newProds));
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    localStorage.setItem('rimsha_cart', JSON.stringify([...cart, product]));
    alert(`${product.name} has been added to cart.`); // User feedback
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('rimsha_cart', JSON.stringify(updatedCart));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPass === adminPass) { setIsLoggedIn(true); setView('dashboard'); }
    else { alert("Incorrect Password!"); }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* --- NEON SIDEBAR --- */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-0 lg:w-24'} overflow-hidden lg:flex flex-col bg-[#111114] border-r border-white/5 transition-all duration-500 fixed lg:sticky top-0 h-screen z-50`}>
        <div className="p-8 flex items-center gap-4 mb-10">
          <div className="bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-3 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <Sparkles className="text-white" size={24}/>
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 uppercase">Rimsha</span>}
        </div>
        
        <nav className="flex-1 px-4 space-y-4">
          {[
            { id: 'home', icon: <Home />, label: 'Home' },
            { id: 'about', icon: <Info />, label: 'About' },
            { id: 'contact', icon: <Phone />, label: 'Contact' },
            { id: 'cart', icon: <ShoppingCart />, label: `Cart (${cart.length})` },
            { id: 'admin-login', icon: <Lock />, label: 'Admin' },
          ].map((item) => (
            <button key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${view === item.id ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'hover:bg-white/5'}`}>
              <span className={`${view === item.id ? 'text-cyan-400' : 'group-hover:text-pink-400 transition-colors'}`}>{item.icon}</span>
              {isSidebarOpen && <span className="font-bold">{item.label}</span>}
            </button>
          ))}
          
          {isLoggedIn && ( // Dashboard button only visible if logged in
            <button onClick={() => { setView('dashboard'); setSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${view === 'dashboard' ? 'bg-gradient-to-r from-teal-500/20 to-lime-500/20 border border-teal-500/50 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'hover:bg-white/5'}`}>
              <span className={`${view === 'dashboard' ? 'text-teal-400' : 'group-hover:text-lime-400 transition-colors'}`}><LayoutDashboard /></span>
              {isSidebarOpen && <span className="font-bold">Dashboard</span>}
            </button>
          )}
        </nav>
        {isLoggedIn && (
          <button onClick={() => setIsLoggedIn(false)} className="mx-4 mb-4 p-4 text-red-400 font-bold hover:bg-red-500/10 rounded-2xl transition-all flex items-center gap-3 justify-center">
            <LogIn size={20}/> {isSidebarOpen && "Logout"}
          </button>
        )}
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-24 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-3 bg-white/5 rounded-2xl lg:hidden hover:bg-white/10 transition-all border border-white/10">
              <Menu size={24} className="text-cyan-400" />
            </button>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">{view.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-white/50 uppercase">Active Mode</p>
                <p className="text-sm font-black text-cyan-400">Colorful Neon</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 border border-white/20 p-[2px]">
                <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center font-bold text-cyan-400">RB</div>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-12">
          
          {/* --- HOME VIEW (Neon Cards) --- */}
          {view === 'home' && (
            <div className="space-y-16 animate-in fade-in duration-700">
              <div className="relative group overflow-hidden bg-gradient-to-br from-[#1a1a20] to-[#0a0a0c] rounded-[3rem] p-10 lg:p-24 border border-white/5 shadow-2xl">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full"></div>
                
                {/* --- Home Page Banner Image --- */}
                <img 
                  src="/handi.jpg" // Traditional Pakistani Craft
                  alt="Rimsha Handicrafts Banner"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                />

                <div className="relative z-10 text-center">
                  <h1 className="text-5xl lg:text-8xl font-black mb-6 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
                    Elegance in <br/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">Handicrafts.</span>
                  </h1>
                  <p className="text-white/40 text-lg max-w-xl mx-auto font-medium mb-10 italic">Purely handmade masterpieces from the heart of Pakistan.</p>
                  <button onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })} className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">SHOP COLLECTION</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.length === 0 ? (
                  <div className="col-span-full text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                    <ShoppingBag className="mx-auto mb-4 text-white/20" size={48}/>
                    <p className="text-white/40 font-bold">No products to display yet. Admin, please add some!</p>
                  </div>
                ) : products.map((p) => (
                  <div key={p.id} className="group bg-[#111114] p-4 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 shadow-xl">
                    <div className="h-64 rounded-[2rem] overflow-hidden mb-6 relative">
                       <img src={p.img} className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100" alt={p.name} />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60"></div>
                       <button onClick={() => addToCart(p)} className="absolute bottom-4 right-4 bg-cyan-500 text-black p-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.5)] transform translate-y-2 group-hover:translate-y-0 transition-all">
                          <Plus size={24}/>
                       </button>
                    </div>
                    <div className="px-2">
                      <h3 className="font-bold text-white/80 group-hover:text-cyan-400 transition-colors uppercase tracking-widest text-sm mb-1">{p.name}</h3>
                      <p className="text-2xl font-black text-white italic">Rs. {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- ABOUT VIEW (Glassmorphism with Images) --- */}
          {view === 'about' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-all"></div>
                  <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10 bg-[#111114]">
                     {/* --- About Page Primary Image --- */}
                     <img 
                        src="/hand.jpg" // Artisanal hands working
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                        alt="Artisan at work" 
                     />
                  </div>
               </div>
               <div className="space-y-8">
                  <h2 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 leading-none">Our Story</h2>
                  <p className="text-lg text-white/50 leading-relaxed font-medium">
                    Rimsha Handicrafts is not just a store; it's a movement. We bring the lost art of handmade luxury back to your modern life, celebrating the rich cultural heritage of Pakistan through every unique piece.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     {['Pure Handmade', 'Global Shipping', 'Eco Friendly', 'Fair Trade'].map(text => (
                        <div key={text} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-3">
                           <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></div>
                           <span className="font-bold text-sm text-white/70 uppercase">{text}</span>
                        </div>
                     ))}
                  </div>
                  {/* --- About Page Secondary Image --- */}
                  <div className="h-48 rounded-2xl overflow-hidden border border-white/10">
                    <img 
                      src="/ban.jpg" // Close-up of beautiful craft
                      className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" 
                      alt="Detail of handicraft" 
                    />
                  </div>
               </div>
            </div>
          )}

          {/* --- CONTACT VIEW (Neon Forms with Map) --- */}
          {view === 'contact' && (
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-top-5 duration-700">
               <div className="bg-[#111114] p-12 rounded-[3.5rem] border border-white/5 space-y-8">
                  <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">Get In Touch</h2>
                  <div className="space-y-4">
                     <input placeholder="Name" className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all font-bold text-white/80" />
                     <input placeholder="Email" type="email" className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 outline-none focus:border-pink-500 focus:bg-pink-500/5 transition-all font-bold text-white/80" />
                     <textarea placeholder="Your Message..." className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 outline-none h-40 focus:border-cyan-500 focus:bg-cyan-500/5 transition-all font-bold text-white/80"></textarea>
                     <button className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center justify-center gap-3">
                        <Send size={20}/> Send Now
                     </button>
                  </div>
               </div>
               <div className="bg-gradient-to-br from-[#111114] to-[#0a0a0c] p-12 rounded-[3.5rem] border border-white/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3 text-pink-400"><MapPin className="text-pink-500"/> Visit Studio</h3>
                    <p className="text-white/40 mb-10 font-medium">Pakistani Street, Mall Road, Lahore.</p>
                  </div>
                  <div className="h-80 rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      marginHeight={0} 
                      marginWidth={0} 
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Mall%20Road,%20Lahore,%20Pakistan+(Rimsha%20Handicrafts)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                  </div>
               </div>
            </div>
          )}

          {/* --- CART VIEW (Neon List with Product Images) --- */}
          {view === 'cart' && (
            <div className="max-w-4xl mx-auto bg-[#111114] p-10 rounded-[4rem] border border-white/5 shadow-2xl animate-in zoom-in duration-500">
               <h2 className="text-4xl font-black mb-12 flex items-center gap-4">
                  <ShoppingCart className="text-cyan-400" size={40}/> Your Cart
               </h2>
               {cart.length === 0 ? (
                 <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                    <p className="text-white/30 font-bold text-xl uppercase tracking-widest">Cart is empty</p>
                    <button onClick={() => setView('home')} className="mt-6 text-cyan-400 font-black border-b border-cyan-400">Back to Shop</button>
                 </div>
               ) : (
                 <div className="space-y-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="group flex items-center gap-8 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all">
                        <img src={item.img} className="w-24 h-24 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg" alt={item.name} />
                        <div className="flex-1">
                           <h4 className="font-black text-xl text-white/80">{item.name}</h4>
                           <p className="text-cyan-400 font-bold tracking-widest">RS. {item.price}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-4 hover:bg-red-500/10 rounded-full"><Trash2/></button>
                      </div>
                    ))}
                    <div className="mt-12 p-10 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_10px_40px_rgba(6,182,212,0.3)]">
                       <div>
                          <p className="font-bold text-white/50 uppercase text-xs mb-1">Final Bill</p>
                          <h3 className="text-5xl font-black text-white italic">Rs. {cart.reduce((a, b) => a + Number(b.price), 0)}</h3>
                       </div>
                       <button className="w-full md:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase">
                          Checkout <ExternalLink size={20}/>
                       </button>
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* --- ADMIN LOGIN VIEW (Dark Theme) --- */}
          {view === 'admin-login' && !isLoggedIn && (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
              <div className="bg-[#111114] p-12 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md text-center animate-in zoom-in duration-500">
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce border border-white/20">
                  <Lock className="text-white" size={36} />
                </div>
                <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 mb-2">Admin Access</h2>
                <p className="text-white/40 mb-8 font-medium italic">Control Panel Login</p>
                <form onSubmit={handleLogin} className="space-y-6">
                  <input type="password" placeholder="Password..." className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all font-bold text-center text-white/80" 
                    onChange={(e) => setInputPass(e.target.value)} required />
                  <button type="submit" className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
                    LOG IN
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* --- DASHBOARD VIEW (ADMIN ONLY) --- */}
          {view === 'dashboard' && isLoggedIn && (
            <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111114] p-8 rounded-[2rem] border-b-4 border-blue-500 border-white/5 shadow-lg">
                  <p className="text-white/40 font-bold text-sm uppercase mb-1">TOTAL PRODUCTS</p>
                  <h3 className="text-5xl font-black text-cyan-400">{products.length}</h3>
                </div>
                <button onClick={() => setView('settings')} className="bg-[#111114] p-8 rounded-[2rem] border-b-4 border-purple-500 border-white/5 shadow-lg flex justify-between items-center group hover:bg-white/5 transition-all">
                  <span className="font-bold text-white/70 uppercase">CHANGE PASSWORD</span>
                  <Settings className="text-purple-400 group-hover:rotate-90 transition-transform"/>
                </button>
                <button onClick={() => { setIsLoggedIn(false); setView('home'); }} className="bg-red-500/10 p-8 rounded-[2rem] border-b-4 border-red-500 border-white/5 font-bold text-red-400 shadow-lg hover:bg-red-500/20 transition-all">LOGOUT</button>
              </div>

              {/* Add Product Form */}
              <div className="bg-[#111114] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                <h3 className="text-xl font-black mb-8 uppercase text-white/80">Naya Craft Shamil Karein</h3>
                <form id="productForm" className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                  <input name="pname" placeholder="Product Name" className="p-5 bg-white/5 rounded-2xl border border-white/10 outline-none focus:ring-2 ring-cyan-500 focus:border-cyan-500 transition-all font-bold text-white/80" required />
                  <input name="price" type="number" placeholder="Price (PKR)" className="p-5 bg-white/5 rounded-2xl border border-white/10 outline-none focus:ring-2 ring-pink-500 focus:border-pink-500 transition-all font-bold text-white/80" required />
                  <div className="md:col-span-2 border-4 border-dashed rounded-[2rem] p-10 text-center relative hover:bg-white/5 transition-all border-white/10">
                    <p className="text-white/40 font-bold">Image Select Karein (Upload Button)</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const form = document.getElementById('productForm') as HTMLFormElement;
                            const newP: Product = { 
                              id: Date.now(), 
                              name: (form.elements.namedItem('pname') as HTMLInputElement).value, 
                              price: (form.elements.namedItem('price') as HTMLInputElement).value, 
                              img: reader.result as string 
                            };
                            saveProducts([...products, newP]);
                            form.reset();
                            alert("Product added to Live Store!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }} required />
                  </div>
                </form>
              </div>

              {/* Management List */}
              <div className="bg-[#111114] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                <h3 className="text-xl font-black mb-6 uppercase text-white/80">LIVE STORE INVENTORY</h3>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-white/40 text-center py-10">No products in inventory.</p>
                  ) : products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-white/10">
                      <div className="flex items-center gap-4">
                        <img src={p.img} className="w-12 h-12 rounded-xl object-cover grayscale hover:grayscale-0 transition-all" alt={p.name} />
                        <span className="font-bold text-white/80">{p.name}</span>
                      </div>
                      <button onClick={() => saveProducts(products.filter(x => x.id !== p.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-full"><Trash2/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- SETTINGS VIEW --- */}
          {view === 'settings' && (
            <div className="max-w-md mx-auto bg-[#111114] p-10 rounded-[3rem] border border-white/5 shadow-2xl animate-in zoom-in duration-300">
              <h2 className="text-2xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">Security Settings</h2>
              <input type="password" placeholder="Naya Password Likhein" className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 mb-4 outline-none focus:ring-4 ring-purple-500/10 focus:border-purple-500 transition-all text-white/80" 
                onBlur={(e) => {
                  if(e.target.value) {
                    setAdminPass(e.target.value);
                    localStorage.setItem('rimsha_pass', e.target.value);
                    alert("Password Changed!");
                  }
                }} />
              <button onClick={() => setView('dashboard')} className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)]">Back to Dashboard</button>
            </div>
          )}

        </main>
      </div>
      
      {/* --- NEON GLOBAL STYLES --- */}
      <style jsx global>{`
        body { 
          background-color: #0a0a0c; 
          font-family: 'Inter', sans-serif; /* Recommended a modern font */
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0c; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}</style>
    </div>
  );
}