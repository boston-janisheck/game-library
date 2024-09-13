import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href="https://github.com/boston-janisheck">
          <GitHubLogoIcon className="footer-icon" />
        </a>
      </div>
      <div className="footer-text">&copy; 2024 /boston-janisheck</div>
      <div>
        <a href="https://www.linkedin.com/in/boston-janisheck/">
          <LinkedInLogoIcon className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
