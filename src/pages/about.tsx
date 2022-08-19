import Helmet from 'react-helmet';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import TeamMember from '../components/TeamMember';
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
    <div className="flex min-h-screen items-center justify-center pt-16 pb-32">
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
            <div className="mb-16 flex flex-wrap">
              <TeamMember
                name="Oliver Chen"
                title="Project Manager"
                // image="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80"
                image="/assets/images/team/Oliver_Chen.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <TeamMember
                name="Jason Li"
                title="Information Architect"
                image="https://images.unsplash.com/photo-1634896941598-b6b500a502a7?fit=clamp&w=400&h=400&q=80"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <TeamMember
                name="Elina Ajamian"
                title="Trust &amp; Safety Manager"
                // image="https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80"
                image="/assets/images/team/Elina_Ajamian.jpg"
                socials={{ linkedin: '#', twitter: '#', instagram: '#' }}
              />
              <TeamMember
                name="Evan Yin"
                title="Art &amp; Design Manager"
                image="https://images.unsplash.com/photo-1635003913011-95971abba560?fit=clamp&w=400&h=400&q=80"
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
                    members={Array(5).fill({
                      name: 'John Doe',
                      image:
                        'https://images.unsplash.com/photo-1634896941598-b6b500a502a7?fit=clamp&w=400&h=400&q=80',
                      title: 'Designer',
                    })}
                  />
                </div>
              </div>
              <div className="mb-6 w-full px-6 sm:px-6 md:w-6/12 lg:w-6/12 lg:px-4">
                <div className="flex flex-col">
                  <h1 className="mb-4 text-xl font-bold text-gray-100">
                    🤝 Trust &amp; Safety Committee
                  </h1>
                  <TeamScroller
                    members={Array(5).fill({
                      name: 'John Doe',
                      image:
                        'https://images.unsplash.com/photo-1634896941598-b6b500a502a7?fit=clamp&w=400&h=400&q=80',
                      title: 'Designer',
                    })}
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
                  <h1 className="mt-2 mb-8 text-xl font-bold text-gray-100">
                    All YEGYouth.Tech Executives
                  </h1>
                  <TeamScroller
                    maxHeight={400}
                    members={Array(25).fill({
                      name: 'John Doe',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Main>
);

export default About;
