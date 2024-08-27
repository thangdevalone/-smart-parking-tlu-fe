export default function ClientSection() {
  return (
    <section
      id="clients"
      className="mx-auto max-w-7xl px-6 text-center md:px-8"
    >
      <div className="py-14">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-center text-sm font-semibold text-gray-600">
            TRUSTED BY TEAMS FROM AROUND THE WORLD
          </h2>
          <div className="mt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
              <li>
                <img
                  alt="Google"
                  src="https://cdn.nyxbui.design/companies/Google.svg"
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  width={28}
                  height={8}
                />
              </li>
              <li>
                <img
                  alt="Microsoft"
                  src="https://cdn.nyxbui.design/companies/Microsoft.svg"
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  width={28}
                  height={8}
                />
              </li>
              <li>
                <img
                  alt="GitHub"
                  src="https://cdn.nyxbui.design/companies/GitHub.svg"
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  width={28}
                  height={8}
                />
              </li>

              <li>
                <img
                  alt="Uber"
                  src="https://cdn.nyxbui.design/companies/Uber.svg"
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  width={28}
                  height={8}
                />
              </li>
              <li>
                <img
                  alt="Notion"
                  src="https://cdn.nyxbui.design/companies/Notion.svg"
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  width={28}
                  height={8}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
