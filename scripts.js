document.addEventListener("DOMContentLoaded", () => {
    const readingLinks = [];
    const otherLinks = [];

    const renderLinks = (links, container) => {
        container.innerHTML = "";
        links.forEach((link, index) => {
            const linkElement = document.createElement("div");
            linkElement.classList.add("border", "p-4", "rounded", "shadow-sm");
            linkElement.innerHTML = `
                <h3 class="text-xl font-semibold">${link.title}</h3>
                <p><strong>URL:</strong> <a href="${link.url}" target="_blank" class="text-blue-500">${link.url}</a></p>
                <p><strong>Topic:</strong> ${link.topic}</p>
                <p><strong>Notes:</strong> ${link.notes}</p>
                <button class="bg-red-500 text-white p-2 mt-2 rounded delete-btn" data-index="${index}">Delete</button>
            `;
            container.appendChild(linkElement);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                if (container.id === "reading-links") {
                    readingLinks.splice(index, 1);
                } else {
                    otherLinks.splice(index, 1);
                }
                renderLinks(readingLinks, document.getElementById("reading-links"));
                renderLinks(otherLinks, document.getElementById("other-links"));
            });
        });
    };

    const filterLinks = (links, topic) => {
        return topic === "" ? links : links.filter(link => link.topic === topic);
    };

    document.getElementById("add-reading-link-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("reading-url").value;
        const title = document.getElementById("reading-title").value;
        const topic = document.getElementById("reading-topic").value;
        const notes = document.getElementById("reading-notes").value;
        readingLinks.push({ url, title, topic, notes });
        renderLinks(readingLinks, document.getElementById("reading-links"));
        e.target.reset();
    });

    document.getElementById("add-other-link-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("other-url").value;
        const title = document.getElementById("other-title").value;
        const topic = document.getElementById("other-topic").value;
        const notes = document.getElementById("other-notes").value;
        otherLinks.push({ url, title, topic, notes });
        renderLinks(otherLinks, document.getElementById("other-links"));
        e.target.reset();
    });

    document.getElementById("reading-filter").addEventListener("change", (e) => {
        const topic = e.target.value;
        renderLinks(filterLinks(readingLinks, topic), document.getElementById("reading-links"));
    });

    document.getElementById("other-filter").addEventListener("change", (e) => {
        const topic = e.target.value;
        renderLinks(filterLinks(otherLinks, topic), document.getElementById("other-links"));
    });
});
