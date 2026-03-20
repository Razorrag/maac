'use client';

export default function EnquiryForm() {
    return (
        <section className="py-24 px-4 md:px-12 relative border-t border-[#2a2a2a] bg-black/20">
            <div className="max-w-4xl mx-auto glass p-8 md:p-12 relative overflow-hidden">
                {/* Glowing orb behind the form */}
                <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-contrast/20 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <div className="text-xs font-bold tracking-widest uppercase text-green mb-2">Request Information</div>
                        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                            KICKSTART YOUR <span className="text-accent">CAREER</span>
                        </h2>
                        <p className="text-cream-muted">
                            Fill out the form below and our career counsellors will get in touch with you.
                        </p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-widest uppercase text-muted">Full Name</label>
                            <input type="text" placeholder="Enter your name" className="bg-surface/50 border border-border p-3 rounded text-foreground focus:border-contrast-light focus:outline-none focus:ring-1 focus:ring-contrast-light transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-widest uppercase text-muted">Mobile Number</label>
                            <input type="tel" placeholder="Enter 10 digit number" className="bg-surface/50 border border-border p-3 rounded text-foreground focus:border-contrast-light focus:outline-none focus:ring-1 focus:ring-contrast-light transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-widest uppercase text-muted">Email Address</label>
                            <input type="email" placeholder="Enter your email" className="bg-surface/50 border border-border p-3 rounded text-foreground focus:border-contrast-light focus:outline-none focus:ring-1 focus:ring-contrast-light transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-widest uppercase text-muted">Interested Course</label>
                            <select className="bg-surface/50 border border-border p-3 rounded text-foreground focus:border-contrast-light focus:outline-none focus:ring-1 focus:ring-contrast-light transition-all appearance-none cursor-pointer">
                                <option value="" disabled defaultValue="">Select a Course</option>
                                <option value="3d">3D Animation</option>
                                <option value="vfx">Visual Effects (VFX)</option>
                                <option value="gaming">Game Design</option>
                                <option value="multimedia">Multimedia & Design</option>
                                <option value="broadcast">Broadcast</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-widest uppercase text-muted">State</label>
                            <select className="bg-surface/50 border border-border p-3 rounded text-foreground focus:border-contrast-light focus:outline-none focus:ring-1 focus:ring-contrast-light transition-all appearance-none cursor-pointer">
                                <option value="" disabled defaultValue="">Select State</option>
                                <option value="mh">Maharashtra</option>
                                <option value="dl">Delhi</option>
                                <option value="ka">Karnataka</option>
                                <option value="tn">Tamil Nadu</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-widest uppercase text-muted">City</label>
                            <select className="bg-surface/50 border border-border p-3 rounded text-foreground focus:border-contrast-light focus:outline-none focus:ring-1 focus:ring-contrast-light transition-all appearance-none cursor-pointer">
                                <option value="" disabled defaultValue="">Select City</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="pune">Pune</option>
                                <option value="delhi">New Delhi</option>
                                <option value="bangalore">Bangalore</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 mt-4 text-center">
                            <button type="button" className="btn-primary w-full md:w-auto px-12 py-4 rounded shadow-[0_0_15px_rgba(232,40,28,0.3)] hover:shadow-[0_0_25px_rgba(232,40,28,0.5)]">
                                SUBMIT ENQUIRY
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
