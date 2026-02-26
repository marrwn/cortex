import fs from "fs";
import path from "path";

export function getSyllabus(dir = "app/(learn)", parentRoute = "") {
  try {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) return [];

    const items = fs.readdirSync(fullPath, { withFileTypes: true });

    return items
      .map((item) => {
        const itemPath = path.join(dir, item.name);
        const isFolder = item.isDirectory();
        const isMDX = item.name.endsWith(".mdx");

        // 1. STRICT FILTER: Only Folders or MDX files. Skip system/layout files.
        if (
          item.name.startsWith("_") ||
          item.name.includes("layout") ||
          (!isFolder && !isMDX)
        ) {
          return null;
        }

        // 2. DO NOT show "page.mdx" as a tab in the sidebar
        if (item.name === "page.mdx") return null;

        const cleanName = item.name.replace(".mdx", "").replace(/\(.*\)/, "");
        const currentRoute = `/${parentRoute}/${cleanName}`.replace(
          /\/+/g,
          "/",
        );

        // 3. RECURSION: Check inside folders
        const children = isFolder ? getSyllabus(itemPath, currentRoute) : [];

        return {
          title: cleanName.toUpperCase().replace(/-/g, " "),
          href: currentRoute,
          isFolder,
          children: children.filter(Boolean),
        };
      })
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}
