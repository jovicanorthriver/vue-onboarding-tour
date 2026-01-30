import { ref } from 'vue'
import VueOnboardingTour from './VueOnboardingTour.vue'
export default {
  title: 'Lib/Components/VueOnboardingTour',

  component: VueOnboardingTour,
  argTypes: {
    onStartTour: { action: 'start-tour' },
    onEndTour: { action: 'end-tour' },
  },
}


const DefaultTemplate = (args) => ({
  components: { VueOnboardingTour },

  setup() {
    const onboardingTourPoppin = ref(false)
    const displayDocSubMenu = ref(false)
    return { args, onboardingTourPoppin, displayDocSubMenu }
  },

  mounted() {
    this.$refs['onboardingTourPoppin'].startTour()
  },

  template: `
    <div class="vot-bg-black vot-relative vot-min-h-screen">
      <VueOnboardingTour v-bind="args" ref="onboardingTourPoppin" show-dots>
        <template #next-step-control="{goNextStep}">
          <button @click="goNextStep">Next</button>
        </template>

        <template #prev-step-control="{goPreviousStep}">
          <button @click="goPreviousStep">Prev</button>
        </template>
      </VueOnboardingTour>
      <nav class="vot-flex vot-float-end vot-p-5 vot-relative vot-z-10">
        <div 
          @mouseenter="displayDocSubMenu = true" 
          @mouseleave="displayDocSubMenu = false" 
          @click="displayDocSubMenu = true" 
          aria-haspopup="true" 
          :aria-expanded="displayDocSubMenu" 
          aria-label="Documentation menu" 
        >
          <div id="nav-doc" class="vot-cursor-pointer vot-text-purple-400 vot-text-xl vot-mb-2">
            Documentation
          </div>
          <div
            id="nav-doc-sub-container"
            class="vot-bg-purple-950/70 vot-py-5 vot-rounded-lg vot-flex vot-flex-col vot-text-white vot-absolute vot-right-5 vot-w-[220px] vot-text-center"
            :aria-hidden="!displayDocSubMenu"
            v-if="displayDocSubMenu"
          >
            <p
              class="vot-cursor-pointer hover:vot-bg-purple-950 vot-py-1"
              @click="goToGithubPage('installation')"
              aria-label="How to install VueOnboardingTour"
            >
              How to install
            </p>
            <p
              class="vot-cursor-pointer hover:vot-bg-purple-950 vot-py-1"
              aria-label="View online documentation for VueOnboardingTour"
            >
              Online Documentation
            </p>
            <p 
              class="vot-cursor-pointer hover:vot-bg-purple-950 vot-py-1" 
              aria-label="Explore VueOnboardingTour Storybook"
            >
              Storybook
            </p>
          </div>
        </div>
      </nav>

      <div class="lg:vot-max-w-[1200px] vot-mx-auto vot-px-10 vot-py-[10rem]">
        <div
          class="vot-text-4xl md:vot-text-5xl lg:vot-text-6xl vot-font-medium vot-text-white vot-text-balance vot-py-2 vot-text-center vot-break-words"
        >
          <h1 class="title-onboarding">
            VueOnboardingTour – The Easiest Way to Guide Your Users in Your Vue App
          </h1>
        </div>

        <div class="vot-mt-20">
          <div class="vot-flex md:!vot-flex-row vot-flex-col vot-text-center vot-gap-10 md:vot-gap-5 lg:vot-gap-10 vot-max-w-[500px] vot-mx-auto md:vot-max-w-full">
            <div class="seamless vot-flex-1" tabindex="0" aria-label="Seamless user onboarding section">
              <h2>
                <span class="vot-text-2xl vot-font-bold vot-text-white">Seamless User Onboarding</span>
              </h2>
              <p class="vot-text-gray-300 vot-mt-3">
                VueOnboardingTour is a Vue.js component that creates guided, step-by-step onboarding tours
                to help users navigate your app intuitively.
              </p>
            </div>

            <div id="easy-to-use" class="easy-to-use vot-flex-1" tabindex="0" aria-label="Lightweight and ready to use section">
              <h2>
                <span class="vot-text-2xl vot-font-bold vot-text-white">Lightweight and Ready to Use</span>
              </h2>
              <p class="vot-text-gray-300 vot-mt-3">
                VueOnboardingTour is designed to be minimal and easy to implement, with a default
                template that’s ready to go out of the box. Get a fully functional tour set up in
                minutes!
              </p>
            </div>

            <div class="customizable vot-flex-1" tabindex="0" aria-label="Customizable section">
              <h2>
                <span class="vot-text-2xl vot-font-bold vot-text-white">Fully Customizable</span>
              </h2>
              <p class="vot-text-gray-300 vot-mt-3">
                Easily adapt VueOnboardingTour to your app’s unique design. With flexible options for
                styling, you can integrate custom elements, colors, and animations to match your
                brand.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            class="vot-hidden lg:!vot-block vot-absolute vot-top-[calc(50%-20rem)] vot-transform-gpu vot-blur-3xl"
          >
            <div
              style="
                clip-path: polygon(
                  73.6% 51.7%,
                  91.7% 11.8%,
                  100% 46.4%,
                  97.4% 82.2%,
                  92.5% 84.9%,
                  75.7% 64%,
                  55.3% 47.5%,
                  46.5% 49.4%,
                  45% 62.9%,
                  50.3% 87.2%,
                  21.3% 64.1%,
                  0.1% 100%,
                  5.4% 51.1%,
                  21.4% 63.9%,
                  58.9% 0.2%,
                  73.6% 51.7%
                );
              "
              class="vot-aspect-[980/632] vot-w-[980px] vot-bg-gradient-to-r vot-from-[#80caff] vot-to-[#4f46e5] vot-opacity-20"
            ></div>
          </div>
        </div>

        <div class="documentation vot-flex md:!vot-flex-row vot-flex-col vot-text-center vot-gap-10 md:vot-gap-5 lg:vot-gap-10 vot-max-w-[500px] vot-mx-auto md:vot-max-w-full vot-text-gray-300 vot-mt-20">
          <div class="vot-bg-gradient-to-r vot-from-red-500 vot-via-yellow-500 vot-to-violet-500 vot-rounded-lg vot-flex-1 vot-p-[2px]" @click="goToGithubPage('installation')">
            <div class="vot-bg-black vot-flex vot-flex-col vot-gap-5 vot-p-5 vot-rounded-lg vot-h-full">
              <h2 class="vot-text-white vot-text-xl vot-font-bold">Start Using VueOnboardingTour</h2>
              <p>Jump right in and add VueOnboardingTour to your project with a few simple steps.</p>
              <span
                class="vot-text-blue-400 vot-leading-6 vot-cursor-pointer hover:vot-text-blue-600 group vot-w-fit vot-mx-auto vot-relative vot-items-center vot-flex vot-pr-4"
              >
                Start with the installation guide
              </span>
            </div>
          </div>

          <div class="vot-bg-gradient-to-r vot-from-red-500 vot-via-yellow-500 vot-to-violet-500 vot-rounded-lg vot-flex-1 vot-p-[2px]">
            <div class="vot-bg-black vot-flex vot-flex-col vot-gap-5 vot-p-5 vot-rounded-lg vot-h-full">
              <h2 class="vot-text-white vot-text-xl vot-font-bold">Online Documentation</h2>
              <p>
                Access the full documentation for detailed guidance on setup, customization, and
                advanced features.
              </p>
              <span
                class="vot-text-blue-400 vot-leading-6 vot-cursor-pointer hover:vot-text-blue-600 group vot-w-fit vot-mx-auto vot-relative vot-items-center vot-flex vot-pr-4"
              >
                Explore the docs
              </span>
            </div>
          </div>

          <div class="vot-bg-gradient-to-r vot-from-red-500 vot-via-yellow-500 vot-to-violet-500 vot-rounded-lg vot-flex-1 vot-p-[2px]">
            <div class="vot-bg-black vot-flex vot-flex-col vot-gap-5 vot-p-5 vot-rounded-lg">
              <h2 class="vot-text-white vot-text-xl vot-font-bold">Interactive Storybook</h2>
              <p>
                Explore VueOnboardingTour in action with our Storybook. See real-time demos and experiment
                with different configurations and styling options.
              </p>
              <span
                class="vot-text-blue-400 vot-leading-6 vot-cursor-pointer hover:vot-text-blue-600 group vot-w-fit vot-mx-auto vot-relative vot-items-center vot-flex vot-pr-4"
              >
                Check out the Storybook
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})

export const Default = DefaultTemplate.bind({})

Default.args = {
  tourId: 'tour1',
  steps: [
    {
      target: '.title-onboarding',
      title: 'Welcome to VueOnboardingTour!',
      description:
        'Take a guided tour through VueOnboardingTour, the ultimate tool for creating intuitive, in-app user guides for your Vue application.',
    },
    {
      target: '.seamless',
      title: 'What is it ?',
      description:
        'VueOnboardingTour enables you to build step-by-step user guides effortlessly, making it easy for users to navigate through your app and understand its features intuitively.',
      tag: 'New!',
    },
    {
      target: '#easy-to-use',
      title: 'Ready to use',
      description:
        'VueOnboardingTour is designed to be minimal and straightforward to use. With a ready-to-go default template, you can set up a fully functional tour in minutes.',
      tag: 'Easy to use',
    },
    {
      target: '.customizable',
      title: 'Open for customization',
      description:
        "With flexible customization options, VueOnboardingTour allows you to tailor each step of your tour to fit your app's unique design and brand identity.",
      tag: 'NEW Feature!',
    },
    {
      target: '.documentation',
      title: 'Start Now!',
      description:
        'Need help getting started or looking for advanced features? Our comprehensive documentation provides everything you need to make the most of VueOnboardingTour.',
      tag: 'Documentation',
    },
    {
      target: '#nav-doc-sub-container',
      title: 'Add some code',
      description:
        'You can execute code before or after moving to a step to simulate some user actions, using the parameters <b>beforeScript</b> and <b>afterScript</b> of the step object',
      beforeScript: () => {
        document.getElementById('nav-doc')?.click()
      },
      afterScript: () => {
        document.querySelector('.documentation')?.click()
        console.log('after moving step')
      },
    },
    {
      target: '',
      title: 'No Target',
      description:
        'If no target given it will put the popup at the middle of the screen',
    },
    {
      target: '',
      title: 'Disabled Step',
      disable: true,
    },
  ],
}

const CustomizedTemplate = (args) => ({
  components: { VueOnboardingTour },

  setup() {
    const onboardingTourPoppin = ref(false)
    const displayDocSubMenu = ref(false)

    return { args, onboardingTourPoppin, displayDocSubMenu }
  },
  methods: {
    closePopup() {
      this.$refs['onboardingTourPoppin'].endTour()
    },
    next() {
      this.$refs['onboardingTourPoppin'].goNextStep()
    },
    previous() {
      this.$refs['onboardingTourPoppin'].goPreviousStep()
    },
  },
  mounted() {
    this.$refs['onboardingTourPoppin'].startTour()
  },
  template: `
    <div class="vot-bg-black vot-relative vot-min-h-screen">
      <VueOnboardingTour v-bind="args" ref="onboardingTourPoppin" v-slot="slotProps">
        <div class="vot-relative vot-bg-yellow-50 vot-rounded-xl vot-shadow-2xl vot-w-80 vot-p-6 vot-text-center vot-border-4 vot-border-dashed vot-border-yellow-400 vot-transform vot-transition-all vot-duration-500 vot-scale-100 hover:vot-scale-105 vot-animate-bounceIn">
          <!-- Close Button -->
          <button 
            @click="closePopup" 
            class="vot-absolute vot-top-3 vot-pb-1 vot-right-3 vot-w-10 vot-h-10 vot-bg-purple-500 vot-text-white vot-rounded-full vot-flex vot-items-center vot-justify-center vot-text-2xl vot-font-bold vot-shadow-lg hover:vot-bg-purple-700 vot-transition vot-duration-200 vot-transform hover:vot-rotate-45"
          >
            &times;
          </button>
          
          <!-- Title -->
          <h2 class="vot-text-3xl vot-font-extrabold vot-text-yellow-600 vot-mb-2">
            {{slotProps.currentStep.title}}
          </h2>

          <!-- Description -->
          <p class="vot-text-purple-700 vot-text-lg vot-font-medium">
            {{slotProps.currentStep.description}}
          </p>

          <div class="vot-mt-5 vot-flex vot-justify-center vot-gap-3">
            <button 
              @click="previous()" 
              class="vot-px-4 vot-py-2 vot-bg-blue-500 vot-text-white vot-font-bold vot-rounded-full hover:vot-bg-blue-600 vot-shadow-md vot-transform hover:vot-scale-110 vot-transition vot-duration-300 vot-ease-out"
            >
              Previous
            </button>
            <button 
              @click="next()" 
              class="vot-px-4 vot-py-2 vot-bg-green-500 vot-text-white vot-font-bold vot-rounded-full hover:vot-bg-green-600 vot-shadow-md vot-transform hover:vot-scale-110 vot-transition vot-duration-300 vot-ease-out"
            >
              Next
            </button>
          </div>
        </div>
      </VueOnboardingTour>

      <nav class="vot-flex vot-float-end vot-p-5 vot-relative vot-z-10">
        <div 
          @mouseenter="displayDocSubMenu = true" 
          @mouseleave="displayDocSubMenu = false" 
          @click="displayDocSubMenu = true" 
          aria-haspopup="true" 
          :aria-expanded="displayDocSubMenu" 
          aria-label="Documentation menu" 
        >
          <div id="nav-doc" class="vot-cursor-pointer vot-text-purple-400 vot-text-xl vot-mb-2">
            Documentation
          </div>
          <div
            id="nav-doc-sub-container"
            class="vot-bg-purple-950/70 vot-py-5 vot-rounded-lg vot-flex vot-flex-col vot-text-white vot-absolute vot-right-5 vot-w-[220px] vot-text-center"
            :aria-hidden="!displayDocSubMenu"
            v-if="displayDocSubMenu"
          >
            <p
              class="vot-cursor-pointer hover:vot-bg-purple-950 vot-py-1"
              @click="goToGithubPage('installation')"
              aria-label="How to install VueOnboardingTour"
            >
              How to install
            </p>
            <p
              class="vot-cursor-pointer hover:vot-bg-purple-950 vot-py-1"
              aria-label="View online documentation for VueOnboardingTour"
            >
              Online Documentation
            </p>
            <p 
              class="vot-cursor-pointer hover:vot-bg-purple-950 vot-py-1" 
              aria-label="Explore VueOnboardingTour Storybook"
            >
              Storybook
            </p>
          </div>
        </div>
      </nav>

      <div class="lg:vot-max-w-[1200px] vot-mx-auto vot-px-10 vot-py-[10rem]">
        <div
          class="vot-text-4xl md:vot-text-5xl lg:vot-text-6xl vot-font-medium vot-text-white vot-text-balance vot-py-2 vot-text-center vot-break-words"
        >
          <h1 class="title-onboarding">
            VueOnboardingTour – The Easiest Way to Guide Your Users in Your Vue App
          </h1>
        </div>

        <div class="vot-mt-20">
          <div class="vot-flex md:!vot-flex-row vot-flex-col vot-text-center vot-gap-10 md:vot-gap-5 lg:vot-gap-10 vot-max-w-[500px] vot-mx-auto md:vot-max-w-full">
            <div class="seamless vot-flex-1" tabindex="0" aria-label="Seamless user onboarding section">
              <h2>
                <span class="vot-text-2xl vot-font-bold vot-text-white">Seamless User Onboarding</span>
              </h2>
              <p class="vot-text-gray-300 vot-mt-3">
                VueOnboardingTour is a Vue.js component that creates guided, step-by-step onboarding tours
                to help users navigate your app intuitively.
              </p>
            </div>

            <div id="easy-to-use" class="easy-to-use vot-flex-1" tabindex="0" aria-label="Lightweight and ready to use section">
              <h2>
                <span class="vot-text-2xl vot-font-bold vot-text-white">Lightweight and Ready to Use</span>
              </h2>
              <p class="vot-text-gray-300 vot-mt-3">
                VueOnboardingTour is designed to be minimal and easy to implement, with a default
                template that’s ready to go out of the box. Get a fully functional tour set up in
                minutes!
              </p>
            </div>

            <div class="customizable vot-flex-1" tabindex="0" aria-label="Customizable section">
              <h2>
                <span class="vot-text-2xl vot-font-bold vot-text-white">Fully Customizable</span>
              </h2>
              <p class="vot-text-gray-300 vot-mt-3">
                Easily adapt VueOnboardingTour to your app’s unique design. With flexible options for
                styling, you can integrate custom elements, colors, and animations to match your
                brand.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            class="vot-hidden lg:!vot-block vot-absolute vot-top-[calc(50%-20rem)] vot-transform-gpu vot-blur-3xl"
          >
            <div
              style="
                clip-path: polygon(
                  73.6% 51.7%,
                  91.7% 11.8%,
                  100% 46.4%,
                  97.4% 82.2%,
                  92.5% 84.9%,
                  75.7% 64%,
                  55.3% 47.5%,
                  46.5% 49.4%,
                  45% 62.9%,
                  50.3% 87.2%,
                  21.3% 64.1%,
                  0.1% 100%,
                  5.4% 51.1%,
                  21.4% 63.9%,
                  58.9% 0.2%,
                  73.6% 51.7%
                );
              "
              class="vot-aspect-[980/632] vot-w-[980px] vot-bg-gradient-to-r vot-from-[#80caff] vot-to-[#4f46e5] vot-opacity-20"
            ></div>
          </div>
        </div>

        <div class="documentation vot-flex md:!vot-flex-row vot-flex-col vot-text-center vot-gap-10 md:vot-gap-5 lg:vot-gap-10 vot-max-w-[500px] vot-mx-auto md:vot-max-w-full vot-text-gray-300 vot-mt-20">
          <div class="vot-bg-gradient-to-r vot-from-red-500 vot-via-yellow-500 vot-to-violet-500 vot-rounded-lg vot-flex-1 vot-p-[2px]" @click="goToGithubPage('installation')">
            <div class="vot-bg-black vot-flex vot-flex-col vot-gap-5 vot-p-5 vot-rounded-lg vot-h-full">
              <h2 class="vot-text-white vot-text-xl vot-font-bold">Start Using VueOnboardingTour</h2>
              <p>Jump right in and add VueOnboardingTour to your project with a few simple steps.</p>
              <span
                class="vot-text-blue-400 vot-leading-6 vot-cursor-pointer hover:vot-text-blue-600 group vot-w-fit vot-mx-auto vot-relative vot-items-center vot-flex vot-pr-4"
              >
                Start with the installation guide
              </span>
            </div>
          </div>

          <div class="vot-bg-gradient-to-r vot-from-red-500 vot-via-yellow-500 vot-to-violet-500 vot-rounded-lg vot-flex-1 vot-p-[2px]">
            <div class="vot-bg-black vot-flex vot-flex-col vot-gap-5 vot-p-5 vot-rounded-lg vot-h-full">
              <h2 class="vot-text-white vot-text-xl vot-font-bold">Online Documentation</h2>
              <p>
                Access the full documentation for detailed guidance on setup, customization, and
                advanced features.
              </p>
              <span
                class="vot-text-blue-400 vot-leading-6 vot-cursor-pointer hover:vot-text-blue-600 group vot-w-fit vot-mx-auto vot-relative vot-items-center vot-flex vot-pr-4"
              >
                Explore the docs
              </span>
            </div>
          </div>

          <div class="vot-bg-gradient-to-r vot-from-red-500 vot-via-yellow-500 vot-to-violet-500 vot-rounded-lg vot-flex-1 vot-p-[2px]">
            <div class="vot-bg-black vot-flex vot-flex-col vot-gap-5 vot-p-5 vot-rounded-lg">
              <h2 class="vot-text-white vot-text-xl vot-font-bold">Interactive Storybook</h2>
              <p>
                Explore VueOnboardingTour in action with our Storybook. See real-time demos and experiment
                with different configurations and styling options.
              </p>
              <span
                class="vot-text-blue-400 vot-leading-6 vot-cursor-pointer hover:vot-text-blue-600 group vot-w-fit vot-mx-auto vot-relative vot-items-center vot-flex vot-pr-4"
              >
                Check out the Storybook
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export const Customized = CustomizedTemplate.bind({})
Customized.args = {
  tourId: 'tour1',
  defaultTemplate: false,
  steps: [
    {
      target: '.title-onboarding',
      title: 'Welcome to VueOnboardingTour',
      description:
        'Take a guided tour through VueOnboardingTour, the ultimate tool for creating intuitive, in-app user guides for your Vue application.',
    },
    {
      target: '.seamless',
      title: 'What is it ?',
      description:
        'VueOnboardingTour enables you to build step-by-step user guides effortlessly, making it easy for users to navigate through your app and understand its features intuitively.',
      tag: 'New!',
    },
    {
      target: '#easy-to-use',
      title: 'Ready to use',
      description:
        'VueOnboardingTour is designed to be minimal and straightforward to use. With a ready-to-go default template, you can set up a fully functional tour in minutes.',
      tag: 'Easy to use',
    },
    {
      target: '.customizable',
      title: 'Open for customization',
      description:
        "With flexible customization options, VueOnboardingTour allows you to tailor each step of your tour to fit your app's unique design and brand identity.",
      tag: 'NEW Feature!',
    },
    {
      target: '.documentation',
      title: 'Start Now!',
      description:
        'Need help getting started or looking for advanced features? Our comprehensive documentation provides everything you need to make the most of VueOnboardingTour.',
      tag: 'Documentation',
    },
    {
      target: '#nav-doc-sub-container',
      title: 'Add some code',
      description:
        'You can execute code before or after moving to a step to simulate some user actions, using the parameters beforeScript and afterScript of the step object',
      beforeScript: () => {
        document.getElementById('nav-doc')?.click()
      },
      afterScript: () => {
        document.getElementById('.documentation')?.click()
        console.log('after moving step')
      },
    },
  ],
}
