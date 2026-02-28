const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
      <span className="font-display text-xl font-bold text-primary">SC</span>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sandeep Chaudhary. Built with passion.</p>
    </div>
  </footer>
);

export default Footer;
