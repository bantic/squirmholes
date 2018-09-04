fix infinite loops

- if all are at bottom, wheel applied to top propagates around to 2->3->top infinitely.
- fix this by breaking the cycle? Remember subscribers and don't applyWheel to the originator?
- or reduce the remaining wheel such that there's no remainder?

scroll types:

- Sync
- reverse
- static (no movement but propagates?)

todo:

- rename the subscribe method to be more clear what is being connected.
