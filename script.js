// Sample product data
const productsData = [
    {
        id: 1,
        title: "FirstLine",
        description: "書き出しから文学作品を当てるクイズアプリ",
        type: "app",
        status: "active",
        technologies: ["React", "Node.js", "MongoDB"],
        database: "MongoDB",
        image: "firstline_thumbnail.jpg",
        releaseDate: "2025年8月",
        background: "モダンなWebテクノロジーを活用し、レスポンシブで高パフォーマンスなアプリケーションを目指しました。",
        url: "https://apps.apple.com/jp/app/firstline-%E6%96%87%E5%AD%A6%E3%82%AF%E3%82%A4%E3%82%BA/id6749605033",
        iosUrl: "https://apps.apple.com/jp/app/firstline-%E6%96%87%E5%AD%A6%E3%82%AF%E3%82%A4%E3%82%BA/id6749605033",
        androidUrl: "https://play.google.com/store/apps/details?id=com.example.firstline"
    },
    {
        id: 2,
        title: "偉人診断",
        description: "歴史上の偉人との類似度を診断するアプリ",
        type: "web",
        status: "active",
        technologies: ["Swift", "Core Data", "UIKit"],
        database: "Core Data",
        image: "product_sumnail_ijin.png",
        releaseDate: "2025年5月",
        background: "このアプリは歴史好きの人々に向けて開発しました。質問に答えることで、あなたと最も似ている歴史上の偉人を診断し、その偉人の生き方や知恵からインスピレーションを得られるようにしました。教育的価値とエンターテイメント性を両立させることを心がけました。",
        url: "https://ijin-shindan.jp/"
    },
    
    {
        id: 3,
        title: "VR化学実験",
        description: "VR上で化学実験が行えるアプリ",
        type: "vr",
        status: "active",
        technologies: ["C#", "Unity", "Blender"],
        database: "N/A",
        image: "product_sumnail_vr.png",
        releaseDate: "2018年5月",
        background: "高校生の頃、もっと自由に化学実験をしてみたいという思いがありました。現実では危険で試せない実験も、VRなら自由に行えると感じ、このアプリを制作しました。<br>※本アプリは実機がないと体験できないため、内容は動画でご覧ください。",
        url: "https://www.youtube.com/watch?v=MtNwqsSi9Mw"
    },
    {
        id: 4,
        title: "データ分析ブログ",
        description: "身近な疑問をデータ分析で解き明かすブログ",
        type: "blog",
        status: "active",
        technologies: ["C#", "Unity", "Blender"],
        database: "N/A",
        image: "blog_thumbnail.png",
        releaseDate: "2023年1月",
        background: "高校生の頃、もっと自由に化学実験をしてみたいという思いがありました。現実では危険で試せない実験も、VRなら自由に行えると感じ、このアプリを制作しました。<br>※本アプリは実機がないと体験できないため、内容は動画でご覧ください。",
        url: "https://gassann.hatenablog.com/"
    },
    {
        id: 5,
        title: "Share",
        description: "個人間のモノのレンタルサービス",
        type: "web",
        status: "closed",
        technologies: ["Kotlin", "Room", "Jetpack Compose"],
        database: "Room Database",
        image: "product_sumnail_share.png",
        releaseDate: "2019年9月",
        background: "「ミキサーを使いたいけど、年に数回しか使わないのに購入するのはもったいない。1回数百円で借りたい。」という思いから、近所の人と個人間でモノの貸し借りを行うサービスをリリースしました。"
    },
    
    {
        id: 6,
        title: "CaT",
        description: "国立大学周辺生活情報サイト",
        type: "web",
        status: "closed",
        technologies: ["Electron", "JavaScript", "SQLite"],
        database: "SQLite",
        image: "product_sumnail_cat.png",
        releaseDate: "2015年10月",
        background: "開発効率を上げるために作成したツールです。シンプルで使いやすいUIを心がけました。"
    }
];

// Router functionality
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = 'products';
        this.init();
    }

    init() {
        // Handle initial route
        this.handleRoute();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle navigation links
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                const route = e.target.getAttribute('data-route');
                
                // Close mobile menu when nav link is clicked
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                if (route === 'blog') {
                    // Allow default behavior for blog link (external site)
                    return;
                }
                e.preventDefault();
                this.navigate(route);
            }
        });

        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navigate(route) {
        this.currentRoute = route;
        window.location.hash = route;
        this.showPage(route);
        this.updateActiveLink(route);
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);
        const route = hash || 'products';
        this.currentRoute = route;
        this.showPage(route);
        this.updateActiveLink(route);
    }

    showPage(route) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(route);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Scroll to top of the page
        window.scrollTo(0, 0);
    }

    updateActiveLink(route) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-route="${route}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Product functionality
class ProductManager {
    constructor() {
        this.products = productsData;
        this.techMode = false;
        this.init();
    }

    init() {
        this.renderProducts();
        
    }

    renderProducts() {
        const container = document.getElementById('products-grid');
        container.innerHTML = '';

        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const typeIcon = this.getTypeIcon(product.type);
        const statusBadge = product.status === 'closed' ? '<span class="status-badge closed">クローズ中</span>' : '';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
                <div class="product-overlay">
                    <div class="product-header">
                        ${statusBadge}
                    </div>
                </div>
            </div>
            <div class="product-content">
                <div class="product-title-row">
                    <h3 class="product-title">${product.title}</h3>
                    ${product.type === 'ios' || product.type === 'android' ? `<div class="store-badges">
                        ${product.type === 'ios' && product.iosUrl ? `<a href="${product.iosUrl}" target="_blank" rel="noopener noreferrer"><img src="Download_on_the_App_Store_Badge_JP_RGB_blk_100317.svg" alt="Download on the App Store" class="app-store-badge"></a>` : ''}
                        ${product.type === 'android' && product.androidUrl ? `<a href="${product.androidUrl}" target="_blank" rel="noopener noreferrer"><img src="GetItOnGooglePlay_Badge_Web_color_Japanese.png" alt="Get it on Google Play" class="google-play-badge"></a>` : ''}
                    </div>` : ''}
                    <div class="product-release">
                        ${product.type && product.type !== 'ios' && product.type !== 'android' && product.type !== 'mobile' ? `<div class="product-type">
                            <span class="type-icon">${typeIcon}</span>
                            <span class="type-text">${this.getTypeText(product.type)}</span>
                        </div>` : ''}
                        <span class="release-date">${product.releaseDate}</span>
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                
                ${product.type === 'mobile' || product.type === 'ios' || product.type === 'android' || product.type === 'app' ? `<div class="mobile-store-badges">
                        ${product.iosUrl ? `<a href="${product.iosUrl}" target="_blank" rel="noopener noreferrer"><img src="Download_on_the_App_Store_Badge_JP_RGB_blk_100317.svg" alt="Download on the App Store" class="mobile-app-store-badge"></a>` : ''}
                        ${product.androidUrl ? `<a href="${product.androidUrl}" target="_blank" rel="noopener noreferrer"><img src="GetItOnGooglePlay_Badge_Web_color_Japanese.png" alt="Get it on Google Play" class="mobile-google-play-badge"></a>` : ''}
                    </div>` : `<div class="product-actions">
                    <button class="background-btn" onclick="productManager.toggleBackground(${product.id})">
                        制作背景
                    </button>
                    <button class="tech-btn" onclick="productManager.toggleTech(${product.id})">
                        使用技術
                    </button>
                </div>`}
                
                <div class="product-background" id="background-${product.id}" style="display: none;">
                    <div class="product-background-content">
                        <p>${product.background}</p>
                    </div>
                </div>
                
                <div class="product-tech" id="tech-${product.id}" style="display: none;">
                    <div class="product-tech-content">
                        <div class="tech-row">
                            <strong>技術:</strong> ${product.technologies.join(', ')}
                        </div>
                        <div class="tech-row">
                            <strong>DB:</strong> ${product.database}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add click event for active products with URL
        if (product.status === 'active' && product.url) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on buttons or links
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                    return;
                }
                window.open(product.url, '_blank', 'noopener,noreferrer');
            });
        }

        return card;
    }

    getTypeIcon(type) {
        const icons = {
            ios: '📱',
            android: '🤖',
            web: '🌐',
            youtube: '🎥',
            blog: '📝',
            vr: '🥽',
            app: '📱'
        };
        return icons[type] || '💻';
    }

    getTypeText(type) {
        const texts = {
            ios: 'iOS',
            android: 'Android',
            web: 'Web',
            youtube: 'YouTube',
            blog: 'Blog',
            vr: 'VR',
            app: 'アプリ'
        };
        return texts[type] || 'Other';
    }

    toggleBackground(productId) {
        const backgroundDiv = document.getElementById(`background-${productId}`);
        const isVisible = backgroundDiv.style.display === 'block';
        
        // Hide all backgrounds and techs
        document.querySelectorAll('.product-background, .product-tech').forEach(div => {
            div.style.display = 'none';
        });
        
        // Show current background if it wasn't visible
        if (!isVisible) {
            backgroundDiv.style.display = 'block';
        }
    }

    toggleTech(productId) {
        const techDiv = document.getElementById(`tech-${productId}`);
        const isVisible = techDiv.style.display === 'block';
        
        // Hide all backgrounds and techs
        document.querySelectorAll('.product-background, .product-tech').forEach(div => {
            div.style.display = 'none';
        });
        
        // Show current tech if it wasn't visible
        if (!isVisible) {
            techDiv.style.display = 'block';
        }
    }
}

// Contact form functionality
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        const form = document.querySelector('.contact-form');
        // FormSubmit.co handles the form submission, so we don't need to prevent default
        form.addEventListener('submit', (e) => {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // FormSubmit.co will handle the actual submission
            // The form will redirect to the _next URL or show a success message
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
    window.productManager = new ProductManager();
    window.contactForm = new ContactForm();
});