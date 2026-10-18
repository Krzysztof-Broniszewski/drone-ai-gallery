
const GITHUB_OWNER = "Krzysztof-Broniszewski";
const GITHUB_REPO = "drone-ai-gallery";

async function loadGallery(folder, containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "<p>Loading images...</p>";

    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${folder}`
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const files = await response.json();

        const images = files.filter(file =>
            file.type === "file" &&
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
        );

        container.innerHTML = "";

        if (images.length === 0) {
            container.innerHTML = "<p>No images found.</p>";
            return;
        }

        images.forEach(file => {
            const img = document.createElement("img");

            img.src = file.download_url;
            img.alt = file.name.replace(/\.[^.]+$/, "");
            img.loading = "lazy";

            container.appendChild(img);
        });

    } catch (error) {
        console.error("Gallery loading error:", error);
        container.innerHTML =
            "<p>Gallery unavailable. Check GitHub files.</p>";
    }
}

loadGallery(
    "projects/volcanic-perfume/references",
    "references-gallery"
);
