import { LitElement, html, css } from "https://unpkg.com/lit?module";

class PowerFlowCard extends LitElement {
  static get properties() {
    return {
      hass: {
        type: Object,
      }, // Home Assistant object (for state)
      config: {
        type: Object,
      }, // User configuration (entities)
    };
  }

  constructor() {
    super();
    this.svgPaths = {
      primary:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWdyaWQiIHNlcmlmOmlkPSJwb3dlcmxpbmUgZ3JpZCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDAsLTQyNS4wNzU4NjQpIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMzc2Ljk0NzksNDQxLjQ4OTYpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwwTDMuMDEyLDBMMCwwWiIgc3R5bGU9ImZpbGw6d2hpdGU7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwzNzYuOTQ3OCw0NDEuNDg5MykiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMy4wMTIsMEwwLDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDM3OC42MjA5LDU3MC42NjUzKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTEyOS4xNzZDMCwtMTI5LjE3NiAwLjQzOCwtMTEwLjUyMiAtMC4xNjcsLTEwMS4zNjRDLTAuNjE3LC05NC41NTggNi4yMjYsLTkyLjExMSA5LjAzNSwtODkuNzZDMTUuNjI0LC04NC4yNDggNTAuNjU2LC03MC43NzYgNTAuNjU2LC03MC43NzZDNTAuNjU2LC03MC43NzYgNjUuMTUxLC02NS4xMjkgNTUuMzYyLC02Mi44N0M0NS41NzQsLTYwLjYxMSAtMjg1LjYyNSwwIC0yODUuNjI1LDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_line.svg
      out: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMDI0MzksLTIuMDk1NTA1LC0xLjA3NDc2MywtMC4wMDQ3NTYsNDQyLjg5NzM1OSwyOTIuMDEwNzU2KSI+CiAgICAgICAgICAgIDxnIGrY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjA3NDc2NiwwLDAsMi4wOTU1MTEsNDEzLjAyMzY3NSw2MTQuMzU4MDU4KSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLW91dHNpZGUiIHNlcmlmOmlkPSJwb3dlcmxpbmUgb3V0c2lkZSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTcxLjIzMUwxNy44OCwtNzQuNDQ1QzE3Ljg4LC03NC40NDUgMjIuOTYyLC03My41MDQgMjMuMjQ0LC02Ny4xOThDMjMuNTI3LC02MC44OTMgMjQuNzA5LC0yNS4wMDIgMjQuNzA5LC0yNS4wMDJDMjQuNzA5LC0yNS4wMDIgMjYuOTE1LC0yMS4wODEgMzAuMzAzLC0xOS42NjlDMzIuMjkyLC0xOC44NCA1MC41MzUsLTExLjAwNCA2NS4yNiwtNC42NzRDNzEuMTQsLTIuMTQ3IDc2LjQ2LDAuMTQxIDc5Ljk1OSwxLjY0NkM4Mi43NTMsMi44NDcgODUuODI4LDMuMjE0IDg4LjgyNywyLjcwN0wxNzcuNzA4LC0xMi4zMjgiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_out.svg
      solar:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMDI0MzksLTIuMDk1NTA1LC0xLjA3NDc2MywtMC4wMDQ3NTYsNDQyLjg5NzM1OSwyOTIuMDEwNzU2KSI+CiAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtc29sYXIiIHNlcmlmOmlkPSJwb3dlcmxpbmUgc29sYXIiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTS02Ni42NTgsMzMuNDgyTC0yNy44ODIsMzMuNDgyQy0yMi4yODcsMzMuMjk0IC0xNC41OTEsMzMuNjggLTUuODg0LDM2LjE2M0M4LjM2Miw0MC4yMjYgMTQuOTg0LDQ4LjAxMyAyMC4wNzQsNTIuNjkxQzI0LjI5Nyw1Ni42NzQgMjkuMzM1LDYzLjExNSAzMy41NTgsNjcuMDk5IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4OyIvPjxwYXRoIGQ9Ik0xMDQwLjQyMiwxMTEzLjczOWwxOTcuNjQ2LDgyLjM1NGw5MDUuODgzLC0xNTIuOTQybDAsLTQ0MS4yMTJsLTQwMi4zNTQsLTI2OS4zNzVsLTUwMy41MjksNDQyLjM1NGwtMjA5LjU5MiwtODcuNTY3bC00NjguMDU0LDk0LjYyNWwtMzUyLjA4NywtMTQ1Ljg4M2wwLDM5Ny42NDZsMjkwLjkxMiwxMzEuNzY3YzAsMCAxMDUuODgzLDU4LjgyMSAxMDguMjMzLDcuMDU4YzIuMzU0LC01MS43NjcgLTIuMzUsLTM0OC4yMzcgLTIuMzUsLTM0OC4yMzdsNDAyLjM1LC03NC45MjFsLTIuMzU0LDM2NC4zMzNsMzUuMjk2LDBaIiBzdHlsZT0iZmlsbDojMjAyNzMzO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMzYxLjcsMjMxLjE1MWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTNaIiBzdHlsZT0iZmlsbDojZmZlZGI4O2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMjYyLjE3NCwzMTYuMzYzbC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTJaIiBzdHlsZT0iZmlsbDojOWU5NjgyO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMTU5LjI4LDQwMi44MzNsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxMloiIHN0eWxlPSJmaWxsOiNmZmVkYjg7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTE0NzUuOTg0LDI3NC4wNTFsLTk1LjcxNyw4MS42NWwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTEwLjA3MSwtMzkuNDU4WiIgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTM3Ni40NTcsMzU5LjI2M2wtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTI3My41NjMsNDQ1LjczM2wtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIgc3R5bGU9ImZpbGw6IzllOTY4MjtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PGcgaWQ9InBvd2VybGluZS1zb2xhciIgc2VyaWY6aWQ9InBvd2VybGluZSBzb2xhciI+PHBhdGggZD0iTTE1NzYuODkxLDg1OC4wNTNsMC4zNjcsLTE2MS41NjdjMC44MzgsLTIzLjMxMiAtMC43LC01NS4zODMgLTEwLjk2MiwtOTEuNjgzYy0xNi43OTIsLTU5LjM5NiAtNDkuMTc1LC04Ny4wNjIgLTY4LjYyMSwtMTA4LjMxN2MtMTYuNTU0LC0xNy42MzMgLTQzLjM0NiwtMzguNjgzIC01OS45MDQsLTU2LjMxNyIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzdmN2Y3ZjtzdHJva2Utd2lkdGg6MjAuODNweDsiLz48L2c+PGcgaWQ9InBvd2VybGluZS1iYXR0ZXJ5IiBzZXJpZjppZD0icG93ZXJsaW5lIGJhdHRlcnkiPjxwYXRoIGQ9Ik0xNTQ5LjMxLDkzMi44MzVsLTk3Ljc1NCwxNy42MTciIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiM3ZjdmN2Y7c3Ryb2tlLXdpZHRoOjIwLjgzcHg7Ii8+PC9nPjxnIGlkPSJwb3dlcmxpbmUtZ3JpZCIgc2VyaWY6aWQ9InBvd2VybGluZSBncmlkIj48cGF0aCBkPSJNMTU3MC42MTYsOTk0LjMyOWwxMi41NSwwbC0xMi41NSwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTU4My4xNjYsOTk0LjMyN2wtMTIuNTUsMCIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6NC4xN3B4OyIvPjxwYXRoIGQ9Ik0xNTc3LjU4Nyw5OTQuMzI3YzAsMCAxLjgyNSw3Ny43MjUgLTAuNjk2LDExNS44ODNjLTEuODc1LDI4LjM1OCAyNi42MzgsMzguNTU0IDM4LjM0Miw0OC4zNWMyNy40NTQsMjIuOTY3IDE3My40MjEsNzkuMSAxNzMuNDIxLDc5LjFjMCwwIDYwLjM5NiwyMy41MjkgMTkuNjA4LDMyLjk0MmMtNDAuNzgzLDkuNDEyIC0xNDIwLjc3OSwyNjEuOTU4IC0xNDIwLjc3OSwyNjEuOTU4IiBzdHlsZT0iZmlsbDojMjAyNzMzO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4OyIvPjwvZz48ZyBpZD0icG93ZXJsaW5lLW91dHNpZGUiIHNlcmlmOmlkPSJwb3dlcmxpbmUgb3V0c2lkZSI+PHBhdGggZD0iTTE2MDEuMjE2LDkyNC43OGw3NC41LC0xMy4zOTJjMCwwIDIxLjE3NSwzLjkyMSAyMi4zNSwzMC4xOTZjMS4xNzksMjYuMjcxIDYuMTA0LDE3NS44MTcgNi4xMDQsMTc1LjgxN2MwLDAgOS4xOTIsMTYuMzM3IDIzLjMwOCwyMi4yMjFjOC4yODcsMy40NTQgODQuMywzNi4xMDQgMTQ1LjY1NCw2Mi40NzljMjQuNSwxMC41MjkgNDYuNjY3LDIwLjA2MiA2MS4yNDYsMjYuMzMzYzExLjY0Miw1LjAwNCAyNC40NTQsNi41MzMgMzYuOTUsNC40MjFsMzcwLjMzOCwtNjIuNjQ2IiBzdHlsZT0iZmlsbDojMjAyNzMzO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMzkyLjU3OCw4MzUuMzA4bDU4LjIzMywtNS40OTJjMCwwIDUuNDkyLC0xLjM3MSA2LjA3OSw1LjQ5MmMwLjk0MiwxMC45NjcgMC4wMTMsMjA3LjA1OCAwLjAxMywyMDcuMDU4YzAsMCAtMi4zNjIsNi4yNzUgLTkuNDI1LDcuODQyYy03LjA1OCwxLjU3MSAtMTA3LjQ1LDE0LjkwNCAtMTA3LjQ1LDE0LjkwNGMwLDAgLTEwLjk3OSwtMS41NzEgLTExLjc2MywtMTIuNTVjLTAuNzgzLC0xMC45NzkgMCwtMjAyLjM1NCAwLC0yMDIuMzU0YzAsMCAtMC42NSwtNi44MDQgNy45NzksLTkuMTU4YzguNjI1LC0yLjM1NCA1Ni4zMzMsLTUuNzQyIDU2LjMzMywtNS43NDIiIHN0eWxlPSJmaWxsOiMwZDE1MWM7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTE0MDEuMjA1LDkwMS4xOWwtMjUuODgzLDUwLjk3OWwxNy4xNTQsMGwwLDI5LjgwNGwyNC40MTcsLTQ0LjcwNGwtMTQuOTA0LDQuMzEybC0wLjc4MywtNDAuMzkyWiIgc3R5bGU9ImZpbGw6IzY4Y2NmODtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PC9nPjwvc3ZnPg==",
    };

    this.lineConfig = [
      {
        id: "solar",
        type: "solar",
        entity_key: "solar_power",
        reverse: true,
        container: "solar",
      },
      {
        id: "battery",
        type: "bat-charge",
        entity_key: "battery_charge_power",
        reverse: false,
        container: "battery",
        pathKey: "battery",
      },
      {
        id: "ev",
        type: "ev",
        entity_key: "ev_charge_power",
        reverse: false,
        container: "ev",
      },
      {
        id: "grid-import",
        type: "grid-import",
        entity_key: "grid_import_power",
        reverse: true,
        container: "primary",
        pathKey: "primary",
      },
      {
        id: "grid-export",
        type: "grid-export",
        entity_key: "grid_export_power",
        reverse: false,
        container: "out",
        pathKey: "out",
      },

      {
        id: "bg",
        type: "bg",
        pathKey: "bg",
        isBackground: true,
        container: "bg",
      },
    ];

    this.isInitialized = false;
  }

  firstUpdated() {
    this.lineContainers = {
      bg: this.shadowRoot.getElementById("svg-container-bg"),
      solar: this.shadowRoot.getElementById("svg-container-solar"),
      battery: this.shadowRoot.getElementById("svg-container-battery"),
      ev: this.shadowRoot.getElementById("svg-container-ev"),
      primary: this.shadowRoot.getElementById("svg-container-primary"),
      out: this.shadowRoot.getElementById("svg-container-out"),
    };
    this.loadAllSVGs();
    this.isInitialized = true;
  }

  set hass(hass) {
    this._hass = hass;
    if (this.isInitialized) {
      this.updateFlow();
    }
  }

  ensureGlow(svgEl) {
    if (!svgEl.querySelector("#glow")) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      defs.innerHTML = `
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>`;
      svgEl.insertBefore(defs, svgEl.firstChild);
    }
  }

  processSVGString(text, containerEl, lineType) {
    containerEl.innerHTML = text;
    const svgEl = containerEl.querySelector("svg");
    if (!svgEl) return;

    this.ensureGlow(svgEl);

    const colorMap = {
      solar: "gold",
      "grid-import": "dodgerblue",
      "grid-export": "limegreen",
      "bat-charge": "cornflowerblue",
      ev: "deepskyblue",
    };

    const desiredColor = colorMap[lineType] || "red";

    svgEl
      .querySelectorAll("path, circle, rect, line, polyline, polygon")
      .forEach((el) => {
        if (el.nodeName === "rect") {
          return;
        }
        el.classList.add("anim-line", lineType);
        el.setAttribute("stroke", desiredColor);
        el.style.setProperty("stroke", desiredColor, "important");
        el.classList.add("flow-off");
      });
  }

  async loadSVG(path, containerEl, lineType, isBackground) {
    try {
      if (!path) throw new Error(`No SVG path provided for ${lineType}`);

      let text;

      if (path.startsWith('data:image/svg+xml;base64,')) {
        const base64Data = path.substring(path.indexOf(',') + 1);
        text = atob(base64Data);
      } else {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`SVG load failed: ${response.status} ${response.statusText}`);
        text = await response.text();
      }

      if (isBackground) {
        containerEl.innerHTML = text;
      } else {
        this.processSVGString(text, containerEl, lineType);
      }
    } catch (err) {
      console.error(`Failed to load SVG for "${lineType}" from path "${path}":`, err);

      containerEl.innerHTML = `
                <p style="color:#f99; text-align:center; font-weight:bold;">
                    Error loading ${lineType} SVG
                </p>
            `;

      throw new Error(`SVG load failed for "${lineType}": ${err.message}`);
    }
  }

  loadAllSVGs() {
    this.lineConfig.forEach((cfg) => {
      const pathKey = cfg.pathKey || cfg.type;
      const path = this.svgPaths[pathKey];

      const containerId = cfg.container || cfg.id;
      const container = this.lineContainers[containerId];

      if (path && container) {
        this.loadSVG(path, container, cfg.type, cfg.isBackground);
      }
    });
  }

  updateFlow() {
    this.lineConfig
      .filter((c) => c.entity_key)
      .forEach((cfg) => {
        const container = this.lineContainers[cfg.container || cfg.id];

        if (!container) return;

        let value = 0;
        let reverse = !!cfg.reverse;

        // Special handling for battery: check both charge and discharge
        if (cfg.type === "bat-charge") {
          const chargeEntity = this.config.entities["battery_charge_power"];
          const dischargeEntity = this.config.entities["battery_discharge_power"];

          const chargeState = chargeEntity ? this._hass.states[chargeEntity] : null;
          const dischargeState = dischargeEntity ? this._hass.states[dischargeEntity] : null;

          const chargeValue = chargeState ? parseFloat(chargeState.state) : 0;
          const dischargeValue = dischargeState ? parseFloat(dischargeState.state) : 0;

          if (chargeValue > 0) {
            value = chargeValue;
            reverse = false; // normal direction
          } else if (dischargeValue > 0) {
            value = dischargeValue;
            reverse = true; // reverse direction
          } else {
            value = 0;
          }
        } else {
          // default behavior for other lines
          const entityId = this.config.entities[cfg.entity_key];
          const stateObj = entityId ? this._hass.states[entityId] : null;
          value = stateObj ? parseFloat(stateObj.state) : 0;
        }

        const lines = container.querySelectorAll(".anim-line");
        const isActive = Math.abs(value) > 10; // 10W threshold

        lines.forEach((line) => {
          line.classList.toggle("flow-active", isActive);
          line.classList.toggle("flow-off", !isActive);
          line.classList.toggle("reverse-flow", reverse);
        });
      });
  }

  setConfig(config) {
    if (!config.entities || Object.keys(config.entities).length === 0) {
      throw new Error(
        "You need to define entities for the power flow diagram."
      );
    }
    this.config = config;
  }

  // Use Home Assistant's built-in form editor
  static getConfigForm() {
    return {
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "entities.solar_power", selector: { entity: {} } },
        { name: "entities.grid_import_power", selector: { entity: {} } },
        { name: "entities.grid_export_power", selector: { entity: {} } },
        { name: "entities.ev_charge_power", selector: { entity: {} } },
        { name: "entities.battery_charge_power", selector: { entity: {} } },
        { name: "entities.battery_discharge_power", selector: { entity: {} } },
      ],
      computeLabel: (schema) => {
        const map = {
          name: "Card title",
          "entities.solar_power": "Solar power entity",
          "entities.grid_import_power": "Grid import entity",
          "entities.grid_export_power": "Grid export entity",
          "entities.ev_charge_power": "EV charge entity",
          "entities.battery_charge_power": "Battery charge entity",
          "entities.battery_discharge_power": "Battery discharge entity",
        };
        return map[schema.name];
      },
      assertConfig: (config) => {
        if (config && config.entities && typeof config.entities !== "object") {
          throw new Error("entities must be an object with entity ids");
        }
      },
    };
  }

  static get styles() {
    return css`
      /* Card Container Setup */
      :host {
        display: block;
      }
      #svg-overlay {
        position: relative;
        width: 100%;
        height: 500px;
        pointer-events: none;
        padding: 16px;
        box-sizing: border-box;
      }
      #svg-overlay > div {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Background Styling */
      #svg-container-bg svg {
        opacity: 0.5;
      }

      /* Animated Line Styles */
      .anim-line {
        stroke-dasharray: 20 15;
        animation:
          dash-move 6s linear infinite,
          pulse 5s ease-in-out infinite alternate;
        filter: url(#glow);
        stroke-width: 5px;
        --dash-dir: -200;
      }

      .reverse-flow {
        --dash-dir: 200;
      }

      /* Animation State Controls */
      .flow-active {
        animation-play-state: running !important;
        opacity: 1 !important;
      }
      .flow-off {
        animation-play-state: paused !important;
        opacity: 0.15 !important;
      }

      @keyframes dash-move {
        to {
          stroke-dashoffset: var(--dash-dir);
        }
      }

      @keyframes pulse {
        0% {
          stroke-opacity: 0.6;
          filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
        }
        50% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
        }
        100% {
          stroke-opacity: 0.6;
          filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
        }
      }

      /* Color definitions (these apply classes to the SVG paths) */
      .solar {
        stroke: gold !important;
      }
      .grid-import {
        stroke: dodgerblue !important;
      }
      .grid-export {
        stroke: limegreen !important;
      } /* <-- Needs 'grid-export' (dash) */
      .ev {
        stroke: deepskyblue !important;
      }
      .bat-charge {
        stroke: cornflowerblue !important;
      }
    `;
  }

  // 7. HTML Template (The card structure)
  render() {
    return html`
      <ha-card header="${this.config.name || "Power Flow Diagram"}">
        <div id="svg-overlay">
          <div id="svg-container-bg"></div>
          <div id="svg-container-solar"></div>
          <div id="svg-container-battery"></div>
          <div id="svg-container-ev"></div>
          <div id="svg-container-primary"></div>
          <div id="svg-container-out"></div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("power-flow-card", PowerFlowCard);