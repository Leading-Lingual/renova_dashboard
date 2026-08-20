import { SVGProps, Ref, forwardRef } from "react"
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg {...props} ref={ref} width="296" height="162" viewBox="0 0 296 162" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="174.714" y="-10.6096" width="53" height="308" rx="26.5" transform="rotate(36.9918 174.714 -10.6096)" fill="#F8CD54"/>
  <rect x="216.714" y="59.3904" width="53" height="308" rx="26.5" transform="rotate(36.9918 216.714 59.3904)" fill="#F8CD54"/>
  <rect x="263.714" y="125.39" width="53" height="308" rx="26.5" transform="rotate(36.9918 263.714 125.39)" fill="#F8CD54"/>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export { ForwardRef as YellowStrokes }
