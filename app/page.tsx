import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import FeaturedAlbums from "@/components/featured-albums";
import UpcomingEvents from "@/components/upcoming-events";
import Gallery from "@/components/gallery";
import ContactSection from "@/components/contact-section";
import VideoShowcase from "@/components/video-showcase";
import HorizontalImageSlider from "@/components/horizontal-image-slider";
import FeaturedBlog from "@/components/featured-blog";
import FeaturedShop from "@/components/featured-shop";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <HorizontalImageSlider />
      <FeaturedAlbums />
      {/* <FeaturedBlog /> */}
      <FeaturedShop />
      <UpcomingEvents />
      <VideoShowcase />
      <Gallery />
      <ContactSection />
      <Footer />
    </main>
  );
}
