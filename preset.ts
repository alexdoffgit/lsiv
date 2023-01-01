export default definePreset({
  name: "lsiv",
  options: {},
  handler: async () => {
    await installPackages({
      title: "install inertia laravel side",
      for: "php",
      packages: "inertiajs/inertia-laravel",
    });

    await executeCommand({
      title: "publish Inertia middleware",
      command: "php",
      arguments: ["artisan", "inertia:middleware"],
    });

    await editFiles({
      title: "register Inertia middleware",
      files: "app/Http/Kernel.php",
      operations: [
        {
          type: "add-line",
          position: "after",
          match: /SubstituteBindings::class,/,
          lines: "\\App\\Http\\Middleware\\HandleInertiaRequests::class,",
        },
      ],
    });

    await editFiles({
      title: "udpate route file",
      files: "routes/web.php",
      operations: [
        {
          type: "update-content",
          update: (r) => r.replace("view('welcome')", "inertia('Hello')"),
        },
      ],
    });

    await deletePaths({
      title: "remove default view",
      paths: ["resources/views/welcome.blade.php"],
    });

    await installPackages({
      title: "install client side dependency",
      for: "node",
      packages: [
        "@inertiajs/inertia",
        "@inertiajs/inertia-svelte",
        "@inertiajs/progress",
      ],
    });

    await installPackages({
      title: "install client side dev dependency",
      for: "node",
      packages: ["@sveltejs/vite-plugin-svelte", "svelte", "gulp", "execa"],
    });

    await extractTemplates({
      title: "extract templates",
      from: "default",
    });

    await editFiles({
      files: "package.json",
      operations: {
        type: "edit-json",
        replace: (json, omit) => ({
          ...json,
          scripts: {
            ...json.scripts,
            "dev-all": "gulp",
          },
        }),
      },
    });
  },
});

// copy app.blade.php
// copy hello template
// install gulp
// copy gulpjs task
// give user run command
