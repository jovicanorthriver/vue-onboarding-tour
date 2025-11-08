<template>
  <div
    v-if="displayOnboardingTour"
    data-test="onboardingTour"
    class="vueOnboardingTour"
    :class="{ 'vot-fixed vot-z-[9999] vot-h-full vot-w-full': overlay }"
  >
    <!-- Overlay Background -->
    <div v-if="overlay" :style="styleOverlay" data-test="overlay" class="overlay"></div>

    <!-- Popup Container -->
    <div
      ref="popup"
      :style="stylePopup"
      :class="[targetElementVisible ? 'vot-opacity-100' : 'vot-opacity-0']"
      class="popupContainer vot-z-[9999] vot-fixed"
      data-test="popupContainer"
    >
      <!-- Slot for Custom Content -->
      <slot :currentStep="currentStep" :currentStepIndex="currentStepIndex"></slot>

      <!-- Default Template Content -->
      <div
        v-if="defaultTemplate"
        class="defaultTemplateContent vot-flex vot-max-w-[320px] vot-flex-col vot-gap-4 vot-rounded-lg vot-bg-white vot-p-6 vot-shadow-lg vot-border vot-border-gray-200 vot-relative vot-w-full"
        data-test="defaultTemplateContent"
      >
        <!-- Chevron (Arrow Pointer) -->
        <span
          v-if="currentStep?.target"
          class="chevronPointer vot-w-4 vot-h-4 vot-absolute vot-bg-white vot-rotate-45"
          :style="styleChevron"
          data-test="chevronPointer"
        ></span>

        <!-- Step Tag (Optional) -->
        <div
          v-if="currentStep?.tag"
          class="stepTag vot-text-xs vot-font-medium vot-text-gray-500 vot-uppercase vot-tracking-wider"
          data-test="stepTag"
        >
          {{ currentStep.tag }}
        </div>

        <!-- Close Icon -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 384 512"
          class="closeIcon vot-absolute vot-top-4 vot-right-4 vot-cursor-pointer vot-w-5 vot-h-5 vot-fill-gray-500 hover:vot-fill-gray-700 vot-transition-colors"
          @click="endTour"
          data-test="closeIcon"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>

        <!-- Step Title -->
        <div
          v-if="currentStep?.title"
          v-html="DOMPurify.sanitize(currentStep.title)"
          class="stepTitle vot-text-lg vot-font-semibold vot-text-gray-900"
          data-test="stepTitle"
        />

        <!-- Step Description -->
        <div
          v-if="currentStep?.description"
          v-html="DOMPurify.sanitize(currentStep.description)"
          class="stepDescription vot-text-sm vot-text-gray-600 vot-leading-relaxed"
          data-test="stepDescription"
        />

        <!-- Navigation and Control -->
        <div class="navigationControls vot-flex vot-w-full vot-items-center vot-mt-4" data-test="navigationControls">
          <!-- Previous Step Icon -->
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 320 512"
            v-if="isPreviousStepEnabled"
            class="previousStepIcon vot-mr-auto vot-cursor-pointer vot-fill-gray-500 hover:vot-fill-gray-700 vot-transition-colors vot-w-4 vot-h-4"
            @click="goPreviousStep"
            data-test="previousStepIcon"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
          </svg>

          <!-- Step Indicators (Dots) -->
          <div v-if="displayedSteps.length > 1" class="stepIndicators vot-flex vot-flex-1 vot-justify-center vot-gap-2" data-test="stepIndicators">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512"
              v-for="(_, idx) in displayedSteps.length"
              :key="`dot_step_${idx}`"
              :class=" `stepIndicator_${idx}`"
              class="vot-cursor-pointer vot-w-2 vot-h-2"
              @click="setStep(idx)"
              :data-test="`stepIndicator_${idx}`"
            >
              <path :key="idx === currentStepIndex ? 'current' : 'non-current'" :fill="idx === currentStepIndex ? '#3b82f6' : '#d1d5db'" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
            </svg>
          </div>

          <!-- Next Step Icon / End Tour -->
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 320 512"
            v-if="isNextStepEnabled"
            class="nextStepIcon vot-ml-auto vot-cursor-pointer vot-fill-gray-500 hover:vot-fill-gray-700 vot-transition-colors vot-w-4 vot-h-4"
            @click="goNextStep"
            data-test="nextStepIcon"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
          </svg>
          <span
            v-else
            class="terminateTourButton vot-ml-auto vot-cursor-pointer vot-text-blue-600 hover:vot-text-blue-800 vot-font-medium vot-transition-colors"
            @click="endTour"
            data-test="terminateTourButton"
          >
            {{ props.labelTerminate }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type MaybeElement, useElementBounding } from '@vueuse/core'
import { ref, onMounted, watch, computed, nextTick, onUnmounted, type Ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import DOMPurify from 'dompurify'

export type OnboardingTourStep = {
  target?: string
  title: string
  description: string
  tag?: string
  disable?: boolean
  beforeScript?: () => void
  afterScript?: () => void
}

export type OnboardingTourProps = {
  tourId: string | number
  defaultTemplate?: boolean
  overlay?: boolean
  startTour?: boolean
  startEvent?: string
  scrollableContainerSelector?: string
  cookieStorage?: boolean
  endDate?: Date
  labelTerminate?: string
  steps: OnboardingTourStep[]
}

type Position = 'left' | 'right' | 'top' | 'bottom' | 'dynamic_bottom' | 'dynamic_top'

const props = withDefaults(
  defineProps<OnboardingTourProps>(),

  {
    overlay: true,
    cookieStorage: false,
    defaultTemplate: true,
    startTour: false,
    startEvent: undefined,
    endDate: undefined,
    scrollableContainerSelector: undefined,
    labelTerminate: 'close',
  },
)

const displayTour = ref(false)

const currentStepIndex = ref(0)

const stylePopup = ref({})

const styleOverlay = ref({})

const styleChevron = ref({})

const popupPosition: Ref<Position> = ref('left')

const popup: Ref<HTMLDivElement | null> = ref(null)

let fakeElement: HTMLElement | null = null; // Store fake element reference

const cookies = useCookies()

const emits = defineEmits(['startTour', 'endTour'])

let domObserverTarget: MutationObserver
let domObserverScrollable: MutationObserver

const targetElement: Ref<Element | null> = ref(null)
const scrollableContainerElement: Ref<Element | null> = ref(null)

/** COMPUTED */
const displayedSteps = computed(() => props.steps.filter(step => !step.disable))

const currentStep = computed(() =>
  displayedSteps.value?.length > 0 ? displayedSteps.value[currentStepIndex.value] : undefined,
)

const targetElementBound = computed(() => useElementBounding(targetElement.value as MaybeElement))

const scrollableContainerBound = computed(
  () => scrollableContainerElement.value && useElementBounding(scrollableContainerElement.value as MaybeElement),
)

const targetElementVisible = computed(() => {
  return (
    targetElementBound.value &&
    ((targetElementBound.value.top.value >= 0 &&
      targetElementBound.value.top.value <= window.innerHeight) ||
      (targetElementBound.value.bottom.value >= 0 &&
        targetElementBound.value.bottom.value <= window.innerHeight) ||
      (targetElementBound.value.bottom.value >= window.innerHeight &&
        targetElementBound.value.top.value <= 0)) &&
    ((targetElementBound.value.left.value >= 0 &&
      targetElementBound.value.left.value <= window.innerWidth) ||
      (targetElementBound.value.right.value >= 0 &&
        targetElementBound.value.right.value <= window.innerWidth) ||
      (targetElementBound.value.right.value >= window.innerWidth &&
        targetElementBound.value.left.value <= 0))
  )
})

const isNextStepEnabled = computed(() => currentStepIndex.value < displayedSteps.value?.length - 1)

const isPreviousStepEnabled = computed(() => currentStepIndex.value > 0)

const displayOnboardingTour = computed(
  () => displayTour.value && displayedSteps.value && displayedSteps.value.length > 0 && targetElement.value,
)

/** METHODS */

const updateStylePopupLeftRight = (left: number, targetTop: number, popupPos: DOMRect) => {
  let top
  if (targetTop + popupPos.height > window.innerHeight) {
    top = window.innerHeight - popupPos.height
  } else if (targetTop <= 0) {
    top = 0
  } else {
    top = targetTop
  }
  stylePopup.value = {
    top: `${top}px`,
    left: `${left}px`,
  }
}

const getStyles = () => {
  const targetElPos = currentStep.value?.target && document.querySelector(currentStep.value?.target)?.getBoundingClientRect()
  const popupPos = popup.value?.getBoundingClientRect()

  if (targetElPos && popupPos) {
    const {
      top: targetTop,
      left: targetLeft,
      bottom: targetBottom,
      right: targetRight,
      width: targetWidth,
      height: targetHeight,
    } = targetElPos

    styleOverlay.value = {
      position: 'fixed',
      width: `${targetWidth + 24}px`,
      height: `${targetHeight + 24}px`,
      top: `${targetTop - 12}px`,
      left: `${targetLeft - 12}px`,
      boxShadow: 'inset 0px 0px 10px 0px rgba(255, 255, 255, 1), 0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
      userEvent: 'none',
      borderRadius: '10px',
      zIndex: 9999,
    }

    if (targetLeft - popupPos.width - 40 > 0) {
      //LEFT
      updateStylePopupLeftRight(targetLeft - popupPos.width - 40, targetTop, popupPos)
      popupPosition.value = 'left'
    } else if (targetRight + popupPos.width + 40 < window.innerWidth) {
      //RIGHT
      updateStylePopupLeftRight(targetRight + 40, targetTop, popupPos)
      popupPosition.value = 'right'
    } else if (targetTop - popupPos.height - 40 > 0) {
      //TOP
      if(targetLeft + popupPos.width + 10 < window.innerWidth) { // Position top but check if popup left doesn't go outside of the screen
        //FIXED
        stylePopup.value = {
          top: `${targetTop - popupPos.height - 40}px`,
          left: `${targetLeft}px`,
        }
        popupPosition.value = 'top'
      } else {
        //DYNAMIC
        stylePopup.value = {
          top: `${targetTop - popupPos.height - 40}px`,
          right: 0
        }
        popupPosition.value = 'dynamic_top'
      }
    } else {
      //BOTTOM
      if(targetLeft + popupPos.width + 10 < window.innerWidth) { // Position bottom but check if popup left doesn't go outside of the screen
        //FIXED
        stylePopup.value = {
        top:
          targetBottom + popupPos.height + 40 < window.innerHeight
            ? `${targetBottom + 40}px`
            : `${window.innerHeight - popupPos.height}px`,
          left: `${targetLeft}px`,
        }
        popupPosition.value = 'bottom'
      } else {
        //DYNAMIC
        stylePopup.value = {
        top:
          targetBottom + popupPos.height + 40 < window.innerHeight
            ? `${targetBottom + 40}px`
            : `${window.innerHeight - popupPos.height}px`,
          right: 0
        }
        popupPosition.value = 'dynamic_bottom'
      }
    }
  } else if(popupPos){
    // Centering the popup if no target is provided
    stylePopup.value = {
      top: `${(window.innerHeight - popupPos.height) / 2}px`,
      left: `${(window.innerWidth - popupPos.width) / 2}px`,
      position: 'fixed',
    };

    styleOverlay.value = {
      position: 'fixed',
      boxShadow: 'inset 0px 0px 10px 0px rgba(255, 255, 255, 1), 0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
      userEvent: 'none',
      borderRadius: '10px',
      zIndex: 9999,
    }
  }

  styleChevron.value = getStyleChevron()
}

const getStyleChevron = () => {
  const targetElPos = currentStep.value?.target && document.querySelector(currentStep.value?.target)?.getBoundingClientRect()
  let dynamicRightPos = 12
  switch (popupPosition.value) {
    case 'left':
      return {
        right: '-0.5rem',
        top: '0.75rem'
      }
    case 'right':
      return {
        left: '-0.5rem',
        top: '0.75rem'
      }
    case 'top':
      return {
        left: '0.75rem',
        bottom: '-0.5rem'
      }
    case 'bottom':
      return {
        left: '0.75rem',
        top: '-0.5rem'
      }
    case 'dynamic_bottom': // dynamic_bottom
      if (targetElPos) {
        dynamicRightPos = window.innerWidth - targetElPos.right + (targetElPos.width ) / 2 - 8
      }
      return {
        top: '-0.5rem',
        right: `${dynamicRightPos}px`
      }
    case 'dynamic_top': // dynamic_top
      if (targetElPos) {
        dynamicRightPos = window.innerWidth - targetElPos.right + (targetElPos.width ) / 2 - 8
      }
      return {
        bottom: '-0.5rem',
        right: `${dynamicRightPos}px`
      }
    default: 
      return {
        left: '0.75rem',
        top: '-0.5rem'
      }
  }
}

const goNextStep = () => {
  if (currentStepIndex.value < displayedSteps.value?.length - 1) currentStepIndex.value += 1
}

const goPreviousStep = () => {
  if (currentStepIndex.value > 0) currentStepIndex.value -= 1
}

const setStep = (index: number) => {
  if (index >= 0 && index <= displayedSteps.value?.length) currentStepIndex.value = index
}

const validateStartTour = () => {
  if (props.endDate) {
    if (new Date() <= props.endDate) {
      return !(props.cookieStorage && cookies.get(`vue_onboarding_tour_${props.tourId}`))
    } else {
      return false
    }
  } else {
    return !(props.cookieStorage && cookies.get(`vue_onboarding_tour_${props.tourId}`))
  }
}

const startTour = () => {
  if (validateStartTour()) {
    displayTour.value = true
    emits('startTour')
  }
}

const endTour = () => {
  if (props.cookieStorage) {
    const options = {
      expires: props.endDate
        ? props.endDate
        : (() => {
            const date = new Date()

            date.setDate(date.getDate() + 365)

            return date
          })(),
    }
    cookies.set(`vue_onboarding_tour_${props.tourId}`, true, options)
  }
  displayTour.value = false
  currentStepIndex.value = 0
  stylePopup.value = {}
  styleOverlay.value = {}
  targetElement.value = null
  if (fakeElement) {
    fakeElement.remove();
    fakeElement = null;
  }
  emits('endTour')
}

const checkAutoScroll = () => {
  if(currentStep.value?.target) {
    const { top: targetTop, left: targetLeft } =
    document.querySelector(currentStep.value?.target)?.getBoundingClientRect() ?? {}
    const popupPos = popup.value?.getBoundingClientRect()
    if (
      targetTop !== undefined &&
      targetLeft !== undefined &&
      popupPos &&
      (targetTop < 0 ||
        targetTop > window.innerHeight ||
        targetLeft < 0 ||
        targetLeft > window.innerWidth)
    ) {
      const top =
        targetTop < 0 || targetTop > window.innerHeight ? targetTop - popupPos.height - 60 : undefined
      const left = targetLeft < 0 || targetLeft > window.innerWidth ? targetLeft : undefined
      if (scrollableContainerElement.value) {
        scrollableContainerElement.value.scrollBy({
          left: left && scrollableContainerBound.value?.left ? left - scrollableContainerBound.value?.left?.value: undefined,
          top: top && scrollableContainerBound.value?.left ? top - scrollableContainerBound.value?.left?.value: undefined,
          behavior: 'smooth',
        })
      } else {
        window.scrollBy({
          left: left,
          top: top,
          behavior: 'smooth',
        })
      }
    }
  }
}

const getTargetElement = () => {
  if (fakeElement) {
    fakeElement.remove();
    fakeElement = null;
  }
  if(currentStep.value?.target) {
    //Add observer to wait for dom generation if element not directly in DOM
    if (document.querySelector(currentStep.value?.target)) {
      targetElement.value = document.querySelector(currentStep.value?.target)
    } else {
      const targetNode = document.body
      const config = { childList: true, subtree: true }
      domObserverTarget = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const externalElement = currentStep.value?.target && document.querySelector(currentStep.value?.target)
            if (externalElement) {
              targetElement.value = externalElement
              domObserverTarget.disconnect()
            }
          }
        }
      })

      domObserverTarget.observe(targetNode, config) // Start observing
    }
  } else {
    fakeElement = document.createElement("div");
    fakeElement.style.position = "fixed";
    fakeElement.style.top = "50%";
    fakeElement.style.left = "50%";
    fakeElement.style.width = "0px";
    fakeElement.style.height = "0px";
    fakeElement.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(fakeElement);

    targetElement.value = fakeElement;
  }
}

const getScrollableContainerElement = () => {
  if(props.scrollableContainerSelector) {
    //Add observer to wait for dom generation if element not directly in DOM
    if (document.querySelector(props.scrollableContainerSelector)) {
      scrollableContainerElement.value = document.querySelector(props.scrollableContainerSelector)
    } else {
      const targetNode = document.body
      const config = { childList: true, subtree: true }
      domObserverScrollable = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const externalElement = props.scrollableContainerSelector && document.querySelector(props.scrollableContainerSelector)
            if (externalElement) {
              scrollableContainerElement.value = externalElement
              domObserverScrollable.disconnect()
            }
          }
        }
      })

      domObserverScrollable.observe(targetNode, config) // Start observing
    }
  }
}

const resizeEventListener = () => {
  if (displayOnboardingTour.value) {
    getStyles()
    checkAutoScroll()
  }
}

const scrollEventListener = () => {
  if (displayOnboardingTour.value) {
    getStyles()
  }
}

defineExpose({ startTour, endTour, goNextStep, goPreviousStep, setStep })

/** LIFECYCLE */
onMounted(() => {
  nextTick(() => getStyles())
  window.addEventListener('resize', resizeEventListener)
  window.addEventListener('scroll', scrollEventListener)
  if (props.startEvent) window.addEventListener(props.startEvent, startTour)
  getTargetElement()
  getScrollableContainerElement()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeEventListener)
  window.removeEventListener('scroll', scrollEventListener)
  if (props.startEvent) window.removeEventListener(props.startEvent, startTour)
  if (domObserverTarget) {
    domObserverTarget.disconnect() // Clean up when component is destroyed
  }
  if (domObserverScrollable) {
    domObserverScrollable.disconnect() // Clean up when component is destroyed
  }
})

/** WATCH */
watch(
  [targetElementBound, scrollableContainerBound, displayTour],
  () => {
    if (displayTour.value) {
      nextTick(() => {
        getStyles()
      })
    }
  },
  { deep: true },
)

watch([currentStepIndex, displayTour], () => {
  if (displayTour.value) {
    if (currentStep.value?.beforeScript) {
      currentStep.value?.beforeScript()
    }
    getTargetElement()
    if (currentStep.value?.afterScript) {
      currentStep.value?.afterScript()
    }
  }
})

watch(targetElement, () => {
  if (displayTour.value) {
    nextTick(() => {
      checkAutoScroll()
    })
  }
})

watch(() => props.startTour, () => {
  if(props.startTour) startTour()
})
</script>
