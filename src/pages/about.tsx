import Helmet from 'react-helmet';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import ExecMember from '../components/ExecMember';
import TeamScroller from '../components/TeamScroller';

const About = () => (
  <Main
    meta={<Meta title="About | Course Companion" description="Lorem ipsum" />}
  >
    <Helmet>
      <style>{`
          html, body {
            min-height: 100%;
            background-color: #18181b;
          }
        `}</style>
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
      />
    </Helmet>
    <div className="flex justify-center pt-16">
      <div className="flex flex-col">
        <div className="mt-8 flex flex-col">
          <div className="container max-w-7xl px-4">
            <div className="mb-24 flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h1 className="mb-8 text-4xl font-bold text-gray-100">
                  Meet the Team
                </h1>
                <p className="text-lg font-light text-gray-300">
                  With over 100 years of combined experience, we've got a
                  well-seasoned team at the helm.
                </p>
              </div>
            </div>
            <div className="mb-16 flex flex-wrap justify-center px-6 sm:px-16">
              <ExecMember
                name="Oliver Chen"
                title="Project Manager"
                // image="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80"
                image="/assets/images/team/Oliver_Chen.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <ExecMember
                name="Evan Yin"
                title="Art &amp; Design Manager"
                image="/assets/images/team/Evan_Yin.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <ExecMember
                name="Justin Qian"
                title="User Feedback Connoisseur"
                image="/assets/images/team/Justin_Qian.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <ExecMember
                name="Elina Ajamian"
                title="Trust &amp; Safety Manager"
                // image="https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80"
                image="/assets/images/team/Elina_Ajamian.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              {/* <div className="basis-full"></div> */}
              <ExecMember
                name="Heril Saha"
                title="Full Stack Web Developer"
                image="/assets/images/team/Heril_Saha.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <ExecMember
                name="Hao Cheng"
                title="Web Developer"
                image="/assets/images/team/Hao_Cheng.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <ExecMember
                name="Jason Li"
                title="Professional Hottie"
                image="/assets/images/team/Jason_Li.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <ExecMember
                name="William Ma"
                title="System Administrator"
                image="/assets/images/team/William_Ma.png"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
            </div>
            <div className="mx-auto flex max-w-4xl flex-wrap">
              <div className="mb-6 w-full px-6 sm:px-6 md:w-6/12 lg:w-6/12 lg:px-4">
                <div className="flex flex-col">
                  <h1 className="mb-4 text-xl font-bold text-gray-100">
                    🎨 Design Committee
                  </h1>
                  <TeamScroller
                    members={[
                      {
                        name: 'Evan Yin',
                        title: 'Cephalopoda Sapiens#1849',
                        image:
                          'https://cdn.discordapp.com/avatars/240264610551300098/ffeebf9cbd46db784ac40f7126989e57.webp',
                      },
                      {
                        name: 'Heril Saha',
                        title: 'segFault#8998',
                        image:
                          'https://cdn.discordapp.com/avatars/494667458737864708/ba1982aa9cade3aa056ba107671673d0.webp',
                      },
                      {
                        name: 'Hao Cheng',
                        title: 'pepeworm#5449',
                        image:
                          'https://cdn.discordapp.com/avatars/513899733752872979/f9510eaa948a3133f78394f514c466f5.webp',
                      },
                      {
                        name: 'Edward Luo',
                        image:
                          'https://cdn.discordapp.com/avatars/704069756717629472/a90bedb744687f7b11fd48b88c9a7f14.webp',
                        title: 'inlowik#0496',
                      },
                      {
                        name: 'Jason Li',
                        image:
                          'https://cdn.discordapp.com/avatars/451871676494249984/ea0ec14de2ab492aa07c803917f8d1ac.webp',
                        title: 'Bobbett#0208',
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="mb-6 w-full px-6 sm:px-6 md:w-6/12 lg:w-6/12 lg:px-4">
                <div className="flex flex-col">
                  <h1 className="mb-4 text-xl font-bold text-gray-100">
                    🤝 Trust &amp; Safety Committee
                  </h1>
                  <TeamScroller
                    members={[
                      {
                        name: 'Elina Ajamian',
                        image:
                          'https://cdn.discordapp.com/avatars/725461810634948718/f00b61f6471798271d4acfb01a3dc014.webp',
                        title: 'elina#1384',
                      },
                      {
                        name: 'Daniel Gong',
                        image:
                          'https://cdn.discordapp.com/avatars/675482506908401682/30784acbc5a035f97297b48ec4df04ce.webp',
                        title: 'peeing#2873',
                      },
                      {
                        name: 'Ada Janisz',
                        image:
                          'https://cdn.discordapp.com/avatars/689188022880829625/3c20083fb6c883d4f126a6dc0c5fb4c2.webp',
                        title: 'Awameina#4566',
                      },
                      {
                        name: 'Aahil Ansari',
                        image:
                          'https://cdn.discordapp.com/avatars/778824458910564373/8d00f3fa63f30d98a4e20349efec3782.webp',
                        title: 'mountain#0707',
                      },
                      {
                        name: 'Justin Qian',
                        image:
                          'https://cdn.discordapp.com/avatars/278974139048656898/3110b45e7f1bc48ade631d135e9b546b.webp',
                        title: 'Justin#6667',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center py-16">
              <div className="mb-6 w-full px-6 sm:px-6 md:w-6/12 lg:w-3/12 lg:px-4">
                <div className="flex flex-col items-center">
                  <span className="text-base font-medium text-gray-100/75">
                    And a huge thank you to...
                  </span>
                  <h1 className="mt-2 mb-8 text-center text-xl font-bold text-gray-100">
                    All YEGYouth.Tech Executives
                  </h1>
                  <TeamScroller
                    maxHeight={400}
                    members={[
                      { name: 'Alex Han' },
                      { name: 'David Liu' },
                      { name: 'Oliver Chen' },
                      { name: 'Joshua Terry' },
                      { name: 'Bayan Shayeb' },
                      { name: 'Austin Bao' },
                      { name: 'Jason Li' },
                      { name: 'Hao Cheng' },
                      { name: 'Aahil Ansari' },
                      { name: 'Evan Yin' },
                      { name: 'Justin Qian' },
                      { name: 'Michelle Jiang' },
                      { name: 'Nathan Zhao' },
                      { name: 'Kevin Lu' },
                      { name: 'Sunny Li' },
                      { name: 'Madhav Desai' },
                      { name: 'Maxwell Li' },
                      { name: 'William Ma' },
                      { name: 'Frank Li' },
                      { name: 'David Zhang' },
                      { name: 'Edwin Zhu' },
                      { name: 'Elina Ajamian' },
                      { name: 'Nathan Fei' },
                      { name: 'Mira Zheng' },
                      { name: 'Eric Qiu' },
                      { name: 'Edward Luo' },
                      { name: 'Tirth Ahir' },
                      { name: 'Daniel Gong' },
                      { name: 'Ada Janisz' },
                      { name: 'Yoyo Liu' },
                      { name: 'Alvin Goh' },
                      { name: 'Andrew Yeh' },
                      { name: 'Jackie Cai' },
                      { name: 'Boris Wang' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p className="text-right text-white/90">julianna is cool btw</p>
  </Main>
);

export default About;
