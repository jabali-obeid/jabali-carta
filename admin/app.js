let menuData = null;
let currentSha = null; // Needed by GitHub API to update a file

// GH Config state
let ghConfig = {
    owner: localStorage.getItem('ghOwner') || '',
    repo: localStorage.getItem('ghRepo') || '',
    token: localStorage.getItem('ghToken') || ''
};

// UI Customization state
let uiConfig = {
    brandName: localStorage.getItem('uiBrandName') || 'JABALÍ',
    accentColor: localStorage.getItem('uiAccentColor') || '#0ea5e9',
    bgColor: localStorage.getItem('uiBgColor') || '#0b1a2b'
};

document.addEventListener('DOMContentLoaded', () => {

    const uploadSection = document.getElementById('upload-section');
    const editorSection = document.getElementById('editor-section');
    const configSection = document.getElementById('config-section');
    
    // Nav Buttons
    const navMenuBtn = document.getElementById('navMenuBtn');
    const navConfigBtn = document.getElementById('navConfigBtn');
    
    const fileInput = document.getElementById('menuFileInput');
    
    // GitHub Form Elements
    const ownerInput = document.getElementById('ghOwner');
    const repoInput = document.getElementById('ghRepo');
    const tokenInput = document.getElementById('ghToken');
    const connectBtn = document.getElementById('ghConnectBtn');
    const errorMsg = document.getElementById('ghErrorMsg');
    
    const syncBtn = document.getElementById('syncBtn');
    const disconnectBtn = document.getElementById('ghDisconnectBtn');

    // Pre-fill form
    ownerInput.value = ghConfig.owner;
    repoInput.value = ghConfig.repo;
    tokenInput.value = ghConfig.token;

    // --- 1. GitHub Connection Logic ---
    connectBtn.addEventListener('click', async () => {
        const owner = ownerInput.value.trim();
        const repo = repoInput.value.trim();
        const token = tokenInput.value.trim();

        if (!owner || !repo || !token) {
            showError("Por favor completa los 3 campos.");
            return;
        }

        connectBtn.textContent = "Conectando...";
        connectBtn.disabled = true;
        errorMsg.style.display = 'none';

        try {
            // First fetch the menu.json from api
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/menu.json`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}: Verifica el token y el nombre del repo.`);
            }

            const data = await res.json();
            
            // GitHub returns file content in Base64
            // We use JS built-in to decode (Handling utf-8 properly)
            const decodedContent = decodeURIComponent(escape(atob(data.content)));
            
            menuData = JSON.parse(decodedContent);
            currentSha = data.sha; // Save SHA for future commits

            // Save config
            ghConfig = { owner, repo, token };
            localStorage.setItem('ghOwner', owner);
            localStorage.setItem('ghRepo', repo);
            localStorage.setItem('ghToken', token);

            // Setup UI for sync mode
            syncBtn.style.display = 'inline-flex';
            disconnectBtn.style.display = 'inline-flex';
            
            showToast("Conectado con GitHub exitosamente", "success");
            initEditor();

        } catch (err) {
            console.error(err);
            showError(err.message || "Error al conectar con GitHub.");
        } finally {
            connectBtn.textContent = "Conectar y Cargar Menú";
            connectBtn.disabled = false;
        }
    });

    disconnectBtn.addEventListener('click', () => {
        localStorage.removeItem('ghToken');
        ghConfig.token = '';
        tokenInput.value = '';
        syncBtn.style.display = 'none';
        disconnectBtn.style.display = 'none';
        currentSha = null;
        menuData = null;
        
        document.getElementById('editor-section').classList.remove('active');
        document.getElementById('upload-section').classList.add('active');
        showToast("Sesión cerrada");
    });

    // --- 2. Push to GitHub Logic ---
    syncBtn.addEventListener('click', async () => {
        if (!menuData || !ghConfig.token || !currentSha) return;

        syncBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> Guardando...';
        syncBtn.disabled = true;

        try {
            // Encode to Base64 proper UTF-8
            const jsonStr = JSON.stringify(menuData, null, 2);
            const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));

            const res = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}/contents/menu.json`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${ghConfig.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Actualización de menú desde el Panel de Control a las ${new Date().toLocaleTimeString()}`,
                    content: base64Content,
                    sha: currentSha
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Error al subir a GitHub");
            }

            const data = await res.json();
            currentSha = data.content.sha; // Update SHA for next commit

            showToast("¡Menú guardado en la nube! Los clientes lo verán en un par de minutos.", "success");

        } catch (err) {
            console.error(err);
            showToast("Error al guardar: " + err.message, "error");
        } finally {
            syncBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span>Guardar en GitHub</span>';
            syncBtn.disabled = false;
        }
    });

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
    }

    // --- 3. Traditional File Input Logic ---
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                menuData = JSON.parse(event.target.result);
                // Hide Sync button if loaded locally
                syncBtn.style.display = 'none';
                disconnectBtn.style.display = 'none';
                initEditor();
            } catch (err) {
                alert("Error: El archivo no es un JSON válido.");
            }
        };
        reader.readAsText(file);
    });

    // --- 4. Export Logic ---
    document.getElementById('exportBtn').addEventListener('click', () => {
        if (!menuData) return;
        
        const jsonStr = JSON.stringify(menuData, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url  = URL.createObjectURL(blob);
        
        const a = document.getElementById('downloadAnchor');
        a.href = url;
        a.download = "menu.json";
        a.click();
        
        URL.revokeObjectURL(url);
    });

    // --- 5. UI Customization & Nav Logic ---
    
    // Apply UI config on load
    applyUiConfig();

    // Setup input listeners for dynamic preview
    const prefBrandName = document.getElementById('prefBrandName');
    const prefAccentColor = document.getElementById('prefAccentColor');
    const prefBgColor = document.getElementById('prefBgColor');
    
    const accentPreview = document.getElementById('accentPreview');
    const accentHex = document.getElementById('accentHex');
    const bgPreview = document.getElementById('bgPreview');
    const bgHex = document.getElementById('bgHex');

    // Pre-fill inputs
    prefBrandName.value = uiConfig.brandName;
    prefAccentColor.value = uiConfig.accentColor;
    prefBgColor.value = uiConfig.bgColor;
    
    updateColorDisplays();

    prefAccentColor.addEventListener('input', (e) => {
        uiConfig.accentColor = e.target.value;
        applyUiConfig();
        updateColorDisplays();
    });

    prefBgColor.addEventListener('input', (e) => {
        uiConfig.bgColor = e.target.value;
        applyUiConfig();
        updateColorDisplays();
    });
    
    prefBrandName.addEventListener('input', (e) => {
        uiConfig.brandName = e.target.value;
        applyUiConfig();
    });

    document.getElementById('saveUIBtn').addEventListener('click', () => {
        localStorage.setItem('uiBrandName', uiConfig.brandName);
        localStorage.setItem('uiAccentColor', uiConfig.accentColor);
        localStorage.setItem('uiBgColor', uiConfig.bgColor);
        showToast("Configuración guardada en el navegador", "success");
    });
    
    document.getElementById('resetUIBtn').addEventListener('click', () => {
        uiConfig.brandName = 'JABALÍ';
        uiConfig.accentColor = '#0ea5e9';
        uiConfig.bgColor = '#0b1a2b';
        
        prefBrandName.value = uiConfig.brandName;
        prefAccentColor.value = uiConfig.accentColor;
        prefBgColor.value = uiConfig.bgColor;
        
        applyUiConfig();
        updateColorDisplays();
        
        localStorage.removeItem('uiBrandName');
        localStorage.removeItem('uiAccentColor');
        localStorage.removeItem('uiBgColor');
        showToast("Estilos restablecidos por defecto");
    });

    // Navigation setup
    navMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navConfigBtn.classList.remove('active');
        navMenuBtn.classList.add('active');
        configSection.classList.remove('active');
        
        if (menuData) {
            editorSection.classList.add('active');
            uploadSection.classList.remove('active');
        } else {
            uploadSection.classList.add('active');
            editorSection.classList.remove('active');
        }
    });

    navConfigBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navMenuBtn.classList.remove('active');
        navConfigBtn.classList.add('active');
        
        uploadSection.classList.remove('active');
        editorSection.classList.remove('active');
        configSection.classList.add('active');
    });

    function applyUiConfig() {
        // Appy Colors to CSS variables
        document.documentElement.style.setProperty('--accent', uiConfig.accentColor);
        document.documentElement.style.setProperty('--bg-main', uiConfig.bgColor);
        
        // Estimate a slightly lighter color for cards based on bg
        const hex = uiConfig.bgColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        // Card bg is slightly lighter
        document.documentElement.style.setProperty('--bg-card', `rgb(${Math.min(255, r+10)}, ${Math.min(255, g+15)}, ${Math.min(255, b+20)})`);
        // Sidebar is slightly darker
        document.documentElement.style.setProperty('--bg-sidebar', `rgb(${Math.max(0, r-5)}, ${Math.max(0, g-5)}, ${Math.max(0, b-5)})`);

        // Update Brand text
        const nameToUse = uiConfig.brandName || 'JABALÍ';
        document.getElementById('brandNameDisplay').textContent = nameToUse;
        document.getElementById('brandLetter').textContent = nameToUse.charAt(0).toUpperCase();
    }

    function updateColorDisplays() {
        accentPreview.style.backgroundColor = uiConfig.accentColor;
        accentHex.textContent = uiConfig.accentColor;
        
        bgPreview.style.backgroundColor = uiConfig.bgColor;
        bgHex.textContent = uiConfig.bgColor;
    }
});

function initEditor() {
    document.getElementById('upload-section').classList.remove('active');
    document.getElementById('editor-section').classList.add('active');
    renderMenu();
}

function updateStats() {
    if (!menuData) return;
    let totalItems = 0;
    let agotados = 0;
    
    menuData.sections.forEach(sec => {
        sec.categories.forEach(cat => {
            cat.items.forEach(item => {
                totalItems++;
                if (item.available === false) agotados++;
            });
        });
    });
    
    document.getElementById('statsLabel').textContent = 
        `Productos Totales: ${totalItems} | Agotados: ${agotados}`;
}

function renderMenu() {
    const root = document.getElementById('menu-editor-root');
    root.innerHTML = '';
    
    if (!menuData || !menuData.sections) return;

    menuData.sections.forEach((section, sIndex) => {
        const sectionHtml = document.createElement('div');
        sectionHtml.className = 'admin-section';
        
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'admin-section-title';
        sectionTitle.textContent = section.label;
        sectionHtml.appendChild(sectionTitle);

        section.categories.forEach((category, cIndex) => {
            const catDiv = document.createElement('div');
            catDiv.className = 'admin-category';
            
            // Header
            catDiv.innerHTML = `
                <div class="admin-category-header">
                    <div class="admin-category-title">${category.title}</div>
                </div>
                <div class="admin-items-list" id="cat-list-${sIndex}-${cIndex}"></div>
                <div class="add-item-bar">
                    <button class="btn btn-outline btn-sm" onclick="addItem(${sIndex}, ${cIndex})">
                        + Agregar Producto Nuevo
                    </button>
                </div>
            `;
            sectionHtml.appendChild(catDiv);
        });
        
        root.appendChild(sectionHtml);
    });

    // After scaffolding, render items
    menuData.sections.forEach((section, sIndex) => {
        section.categories.forEach((category, cIndex) => {
            const listDiv = document.getElementById(`cat-list-${sIndex}-${cIndex}`);
            
            category.items.forEach((item, iIndex) => {
                const itemRow = createItemRow(item, sIndex, cIndex, iIndex);
                listDiv.appendChild(itemRow);
            });
        });
    });
    
    updateStats();
}

function createItemRow(item, sIndex, cIndex, iIndex) {
    const row = document.createElement('div');
    row.className = 'admin-item-row';
    if (item.available === false) row.classList.add('is-agotado');

    const isAvailable = item.available !== false; // defaults to true if missing

    row.innerHTML = `
        <div class="form-group">
            <label>Nombre del Producto</label>
            <input type="text" class="form-control" value="${escapeHtml(item.name || '')}" 
                onchange="updateItemField(${sIndex}, ${cIndex}, ${iIndex}, 'name', this.value)">
        </div>
        
        <div class="form-group">
            <label>Precio (Ej: $12.000)</label>
            <input type="text" class="form-control" value="${escapeHtml(item.price || '')}" 
                onchange="updateItemField(${sIndex}, ${cIndex}, ${iIndex}, 'price', this.value)"
                placeholder="$0.000">
        </div>
        
        <div class="form-group">
            <label>Visibilidad</label>
            <label class="switch-wrapper">
                <span class="switch">
                    <input type="checkbox" ${isAvailable ? 'checked' : ''} 
                        onchange="updateItemAvailability(${sIndex}, ${cIndex}, ${iIndex}, this.checked)">
                    <span class="slider"></span>
                </span>
                <span class="switch-label" id="lbl-${sIndex}-${cIndex}-${iIndex}">
                    ${isAvailable ? 'Disponible' : 'Agotado'}
                </span>
            </label>
        </div>
        
        <div class="form-group">
            <label>&nbsp;</label>
            <button class="btn btn-danger" onclick="removeItem(${sIndex}, ${cIndex}, ${iIndex})" title="Eliminar Producto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        </div>
    `;
    
    return row;
}

// Data Update Handlers
window.updateItemField = function(s, c, i, field, value) {
    menuData.sections[s].categories[c].items[i][field] = value;
};

window.updateItemAvailability = function(s, c, i, isChecked) {
    menuData.sections[s].categories[c].items[i].available = isChecked;
    // Re-render to update classes and stats
    renderMenu();
};

window.removeItem = function(s, c, i) {
    if(confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        menuData.sections[s].categories[c].items.splice(i, 1);
        renderMenu();
    }
};

window.addItem = function(s, c) {
    menuData.sections[s].categories[c].items.push({
        name: "Nuevo Producto",
        price: "$0.000",
        available: true,
        desc: "",
        tags: []
    });
    renderMenu();
};

// Utils
function escapeHtml(unsafe) {
    return (unsafe||"").toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

let toastTimeout;
function showToast(message, type = "success") {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.className = 'toast';
    }, 4000);
}
