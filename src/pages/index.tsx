import Link from 'next/link';
import { useRouter } from 'next/router';
import Helmet from 'react-helmet';

import { UserAuth } from '@/contexts/AuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();
  const { user } = UserAuth();
  return (
    <Main
      meta={
        <Meta
          title="Course Companion"
          description="A non-district tool to help students compare their timetables, filling in the gaps in official programs (SchoolZone)."
        />
      }
    >
      <Helmet>
        <style>{`
          html, body {
            min-height: 100%;
            background-color: #18181b;
          }
        `}</style>
      </Helmet>

      <div className="relative flex min-h-screen w-full flex-col justify-center bg-gray-900 px-4 py-32 md:h-auto lg:min-h-screen lg:p-8 lg:pt-32 xl:p-16 2xl:p-24">
        <div className="z-10 flex flex-row justify-center">
          <div className="flex max-w-full flex-col items-start justify-center gap-4 p-8 lg:w-10/12 lg:p-8 2xl:p-12">
            <h1 className="animate-gradient-slow bg-gradient-to-l from-blue-300 via-green-300 to-blue-300 bg-clip-text text-4xl font-bold text-transparent lg:text-6xl">
              Course Companion
            </h1>
            <h2 className="text-2xl font-bold text-text-500/[.87] lg:text-2xl 2xl:text-3xl ">
              Formerly known as
              <br />
              <span className="inf:text-transparent animate-gradient-slow bg-gradient-to-l from-green-300 via-blue-400 to-green-300 bg-clip-text lg:bg-none lg:text-current">
                <span className="inf:bg-none from-green-300 to-blue-400 bg-clip-text text-transparent lg:bg-gradient-to-l">
                  Course Comparison Spreadsheet
                </span>
              </span>
              <br />
            </h2>
            <span className="font-body text-xl text-text-500/[.6]">
              A non-district tool to help students compare their timetables,
              filling in the gaps in official programs (SchoolZone).
              <br />
              <br />
              For students, by students ❤️
            </span>
            <br />
            <div className="flex w-full flex-col gap-4 lg:grow lg:justify-end">
              <div className="flex w-full flex-row gap-4 lg:flex-col">
                <div className="">
                  <Link href={(!user?.uid && '/signin') || '/app'}>
                    <a className="cursor-pointer rounded-full border-2 border-gray-800  !bg-transparent p-2 px-6 text-lg  transition-all hover:!border-primary-500 hover:bg-primary-400 hover:shadow-sm focus:bg-primary-700 disabled:opacity-50">
                      <span className="animate-gradient-slow bg-gradient-to-r from-primary-500 via-blue-500 to-primary-500 bg-clip-text !text-transparent">
                        {!user?.uid
                          ? 'Log in (Closed Beta)'
                          : 'Continue to app'}
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden flex-col items-center justify-center gap-8 p-16 lg:flex">
            <img
              src="https://disadus-ht2rdc24j-icedtet.vercel.app/CuteLogo.svg"
              alt="Logo"
              className="h-[32rem] w-auto"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-0 hidden h-96 bg-gray-850 lg:block">
          <span className="absolute bottom-0 right-0 m-6 bg-gradient-to-r from-text-500/[.74] to-text-500/[.87] bg-clip-text font-display !text-transparent">
            Presented by YEGYouth.Tech
          </span>
          <svg
            id="visual"
            viewBox="0 25 900 200"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <g>
              <path
                id="wavy1"
                d="M0,107.631L0,98.934L0,90.519L0,82.175L0,73.686L0,64.84L0,55.422L0,45.22L0,34.019L0,21.605L2.088,11.192L6.997,5.378L13.657,0L21.299,0L29.813,0L37.875,0L46.892,0L56.729,0L67.252,0L74.133,0L83.272,0L94.9,0L106.641,0L117.708,0L128.256,0L138.244,0L148.228,0L158.208,0L168.186,0L178.161,0L188.134,0L198.106,0L208.076,0L218.049,0L228.027,0L238.011,0L248,0L257.981,0L267.958,0L277.937,0L287.918,0L297.899,0L307.879,0L317.859,0L327.842,0L337.825,0L347.808,0L357.789,0L367.768,0L377.743,0L387.729,0L397.714,0L407.692,0L417.666,0L424.068,0L431.938,0L441.913,0L451.888,0L461.863,0L471.839,0L481.816,0L491.795,0L501.776,0L511.762,0L521.735,0L531.711,0L541.691,0L551.674,0L561.659,0L571.644,0L581.628,0L591.61,0L601.59,0L611.567,0L621.545,0L631.521,0L641.496,0L651.487,0L661.474,0L671.455,0L681.433,0L691.406,0L701.376,0L711.346,0L721.318,0L731.293,0L741.272,0L751.255,0L761.242,0L771.442,0L776.122,0L786.823,0L797.84,0L809.471,0L820.969,0L832.086,0L842.688,0L852.64,0L861.808,0L870.057,0L877.252,0L884.931,0L894.086,0L900,5.26L900,14.7L900,23.535L900,31.992L900,40.298L900,48.68L900,57.365L900,66.58L899.999,76.553L900,87.51L899.999,99.679L898.757,111.67L895.887,122.044L888.32,128.141L881.084,132.726L872.947,137.809L865.821,142.245L857.882,146.854L849.232,151.427L839.971,155.752L830.203,159.621L820.028,162.822L809.547,165.145L801.858,165.842L795.34,165.757L785.095,165.662L774.757,164.706L764.467,162.892L755.225,160.417L745.987,157.431L736.754,154.062L727.525,150.436L718.299,146.679L709.076,142.918L699.617,139.195L690.109,135.656L680.598,132.332L671.084,129.236L661.567,126.38L652.047,123.776L642.523,121.437L632.96,119.361L623.28,117.521L613.598,115.94L603.905,114.584L594.202,113.418L584.497,112.399L574.789,111.484L565.081,110.627L555.372,109.785L545.665,108.913L535.96,107.966L526.258,106.899L516.561,105.669L507,104.266L497.368,102.714L487.695,101.064L478.025,99.365L468.894,97.662L464.349,95.87L454.684,94.183L445.021,92.643L435.359,91.296L425.698,90.189L416.038,89.367L406.306,88.849L396.546,88.683L386.781,88.886L377.009,89.464L367.435,90.388L357.878,91.719L348.319,93.498L338.758,95.763L329.197,98.549L319.636,101.893L310.257,105.707L301.437,109.647L292.616,114.004L283.795,118.736L274.975,123.8L266.157,129.156L257.342,134.761L248.688,140.477L240.19,146.204L231.697,151.901L223.208,157.447L214.722,162.719L206.239,167.594L197.422,172.069L188.116,175.958L178.808,179.034L169.498,181.328L160.185,182.866L150.869,183.677L144.468,183.134L137.365,182.597L128.044,181.976L118.517,180.791L108.37,178.963L97.444,176.468L86.678,173.634L76.185,170.527L66.075,167.212L56.462,163.757L47.456,160.227L39.17,156.689L31.715,153.209L24.203,149.832L15.899,146.638L12.649,139.506L8.892,132.169L5.171,125.059L0,116.825Z"
                fill="rgb(24, 24, 27)"
                strokeLinecap="round"
                strokeLinejoin="miter"
              ></path>
            </g>
            <g style={{ visibility: 'hidden' }}>
              <path
                id="wavy2"
                d="M0 106L21.5 124.8C43 143.7 86 181.3 128.8 182C171.7 182.7 214.3 146.3 257.2 124.7C300 103 343 96 385.8 90.2C428.7 84.3 471.3 79.7 514.2 83.5C557 87.3 600 99.7 642.8 119.3C685.7 139 728.3 166 771.2 168C814 170 857 147 878.5 135.5L900 124L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
                fill="rgb(24, 24, 27)"
                strokeLinecap="round"
                strokeLinejoin="miter"
              ></path>
            </g>
            <g style={{ visibility: 'hidden' }}>
              <path
                id="wavy3"
                d="M0 140L16.7 152C33.3 164 66.7 188 100 179C133.3 170 166.7 128 200 115.5C233.3 103 266.7 120 300 126.3C333.3 132.7 366.7 128.3 400 125C433.3 121.7 466.7 119.3 500 124.5C533.3 129.7 566.7 142.3 600 155.3C633.3 168.3 666.7 181.7 700 184C733.3 186.3 766.7 177.7 800 167.7C833.3 157.7 866.7 146.3 883.3 140.7L900 135L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
                fill="rgb(24, 24, 27)"
                strokeLinecap="round"
                strokeLinejoin="miter"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      {/* <div className="mx-auto max-w-7xl bg-gray-900 px-2 py-6 sm:px-6 lg:px-8">
        <a href="https://github.com/ixartz/Next-js-Boilerplate">
          <img
            src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
            alt="Nextjs starter banner"
          />
        </a>
        <h1 className="text-2xl font-bold">
          Boilerplate code for your Nextjs project with Tailwind CSS
        </h1>
        <p>
          <span role="img" aria-label="rocket">
            🚀
          </span>{' '}
          Next.js Boilerplate is a starter code for your Next js project by
          putting developer experience first .{' '}
          <span role="img" aria-label="zap">
            ⚡️
          </span>{' '}
          Made with Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged,
          VSCode, Netlify, PostCSS, Tailwind CSS.
        </p>
        <h2 className="text-lg font-semibold">Next js Boilerplate Features</h2>
        <p>Developer experience first:</p>
        <ul>
          <li>
            <span role="img" aria-label="fire">
              🔥
            </span>{' '}
            <a href="https://nextjs.org" rel="nofollow">
              Next.js
            </a>{' '}
            for Static Site Generator
          </li>
          <li>
            <span role="img" aria-label="art">
              🎨
            </span>{' '}
            Integrate with{' '}
            <a href="https://tailwindcss.com" rel="nofollow">
              Tailwind CSS
            </a>
          </li>
          <li>
            <span role="img" aria-label="nail_care">
              💅
            </span>{' '}
            PostCSS for processing Tailwind CSS
          </li>
          <li>
            <span role="img" aria-label="tada">
              🎉
            </span>{' '}
            Type checking Typescript
          </li>
          <li>
            <span role="img" aria-label="pencil2">
              ✏️
            </span>{' '}
            Linter with{' '}
            <a href="https://eslint.org" rel="nofollow">
              ESLint
            </a>
          </li>
          <li>
            <span role="img" aria-label="hammer_and_wrench">
              🛠
            </span>{' '}
            Code Formatter with{' '}
            <a href="https://prettier.io" rel="nofollow">
              Prettier
            </a>
          </li>
          <li>
            <span role="img" aria-label="fox_face">
              🦊
            </span>{' '}
            Husky for Git Hooks
          </li>
          <li>
            <span role="img" aria-label="no_entry_sign">
              🚫
            </span>{' '}
            Lint-staged for running linters on Git staged files
          </li>
          <li>
            <span role="img" aria-label="no_entry_sign">
              🗂
            </span>{' '}
            VSCode configuration: Debug, Settings, Tasks and extension for
            PostCSS, ESLint, Prettier, TypeScript
          </li>
          <li>
            <span role="img" aria-label="robot">
              🤖
            </span>{' '}
            SEO metadata, JSON-LD and Open Graph tags with Next SEO
          </li>
          <li>
            <span role="img" aria-label="robot">
              ⚙️
            </span>{' '}
            <a
              href="https://www.npmjs.com/package/@next/bundle-analyzer"
              rel="nofollow"
            >
              Bundler Analyzer
            </a>
          </li>
          <li>
            <span role="img" aria-label="rainbow">
              🌈
            </span>{' '}
            Include a FREE minimalist theme
          </li>
          <li>
            <span role="img" aria-label="hundred">
              💯
            </span>{' '}
            Maximize lighthouse score
          </li>
        </ul>
        <p>Built-in feature from Next.js:</p>
        <ul>
          <li>
            <span role="img" aria-label="coffee">
              ☕
            </span>{' '}
            Minify HTML &amp; CSS
          </li>
          <li>
            <span role="img" aria-label="dash">
              💨
            </span>{' '}
            Live reload
          </li>
          <li>
            <span role="img" aria-label="white_check_mark">
              ✅
            </span>{' '}
            Cache busting
          </li>
        </ul>
        <h2 className="text-lg font-semibold">Our Stater code Philosophy</h2>
        <ul>
          <li>Minimal code</li>
          <li>SEO-friendly</li>
          <li>
            <span role="img" aria-label="rocket">
              🚀
            </span>{' '}
            Production-ready
          </li>
        </ul>
        <p>
          Check our GitHub project for more information about{' '}
          <a href="https://github.com/ixartz/Next-js-Boilerplate">
            Nextjs Boilerplate
          </a>
          . You can also browse our{' '}
          <a href="https://creativedesignsguru.com/category/nextjs/">
            Premium NextJS Templates
          </a>{' '}
          on our website to support this project.
        </p>
      </div> */}
    </Main>
  );
};

export default Index;
