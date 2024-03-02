import './Footer.css'; 
import HealingIcon from '@mui/icons-material/Healing';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <HealingIcon sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '5px' }} />
                <p>GestureSway</p>
            </div>
            <div className="social-icons">
                <InstagramIcon />
                <FacebookIcon />
                <GitHubIcon />
                <YouTubeIcon />
            </div>
            <p>&copy; 2024 GestureSway. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
