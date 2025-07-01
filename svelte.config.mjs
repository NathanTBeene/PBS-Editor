import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-auto' // Ensure the correct adapter is imported

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return
    if (warning.code === 'missing-exports-condition') return
    if (warning.code === 'a11y-no-static-element-interactions') return
    if (warning.code === 'svelte-ignore a11y-autofocus') return
    if (warning.code.startsWith('css-unused-selector')) return
    handler(warning)
  },
  kit: {
    adapter: adapter()
  },
  compilerOptions: {
    warningFilter: (warning) => {
      const ignore = [
        'a11y_media_has_caption',
        'a11y_no_redundant_roles',
        'a11y_consider_explicit_label',
        'a11y_no_noninteractive_tabindex',
        'a11y_click_events_have_key_events',
        'a11y_no_static_element_interactions',
        'a11y_no_noninteractive_element_interactions'
      ]
      return !ignore.includes(warning.code)
    }
  }
}
