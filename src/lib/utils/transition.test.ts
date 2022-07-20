import { Action as NavigationType } from "history"

import { PresentationByPath } from "./presentation"
import { getTransition } from "./transition"

export const presentationByPath: PresentationByPath = {
  "/users/pick": "modal",
  "/users/:id/edit": "modal",
  "/accounts/pick": "modal",
}

const paths = [
  "/",
  "/tabs/1",
  "/tabs/2",
  "/tabs/3",
  "/about",
  "/users",
  "/users/pick",
  "/users/details",
  "/users/:id/edit",
  "/accounts/pick",
]

/*
 from / to /users = default
 from / to /users/pick = default -> modal
 from /users/pick to /users/details = default -> default (siblings)
 from / to /users/details = default -> modal
 from / to /users/:id/edit = default -> modal
 from /users/pick to /users/:id/edit = modal -> modal

 from / to /tabs/1 = default -> default
 from /tabs/1 to /tabs/2 = switch -> switch

 from /tabs/1 to /users/pick = default -> modal
*/

describe("transition", () => {
  describe("getTransition", () => {
    test("getTransition", () => {
      expect(
        getTransition(
          "/",
          "/users",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 0,
            "path": "/",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 1,
            "path": "/users",
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/users",
          "/",
          presentationByPath,
          paths,
          NavigationType.Pop,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 1,
            "path": "/users",
            "presentation": "default",
          },
          "navigationType": "POP",
          "to": Object {
            "depth": 0,
            "path": "/",
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/",
          "/users/pick",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 0,
            "path": "/",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/users/pick",
            "presentation": "modal",
          },
        }
      `)
      expect(
        getTransition(
          "/users/pick",
          "/users/details",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 2,
            "path": "/users/pick",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/users/details",
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/",
          "/users/details",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 0,
            "path": "/",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/users/details",
            "presentation": "modal",
          },
        }
      `)
      expect(
        getTransition(
          "/",
          "/users/123/edit",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 0,
            "path": "/",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 3,
            "path": "/users/:id/edit",
            "presentation": "modal",
          },
        }
      `)
      expect(
        getTransition(
          "/users/pick",
          "/users/123/edit",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 2,
            "path": "/users/pick",
            "presentation": "modal",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 3,
            "path": "/users/:id/edit",
            "presentation": "modal",
          },
        }
      `)
      expect(
        getTransition(
          "/users/123/edit",
          "/users/pick",
          presentationByPath,
          paths,
          NavigationType.Pop,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 3,
            "path": "/users/:id/edit",
            "presentation": "modal",
          },
          "navigationType": "POP",
          "to": Object {
            "depth": 2,
            "path": "/users/pick",
            "presentation": "modal",
          },
        }
      `)
      expect(
        getTransition(
          "/users/123/edit",
          "/users",
          presentationByPath,
          paths,
          NavigationType.Pop,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 3,
            "path": "/users/:id/edit",
            "presentation": "modal",
          },
          "navigationType": "POP",
          "to": Object {
            "depth": 1,
            "path": "/users",
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/accounts",
          "/accounts/pick",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/accounts/pick",
            "presentation": "modal",
          },
        }
      `)
      expect(
        getTransition(
          "/accounts/pick",
          "/accounts",
          presentationByPath,
          paths,
          NavigationType.Pop,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 2,
            "path": "/accounts/pick",
            "presentation": "modal",
          },
          "navigationType": "POP",
          "to": Object {
            "depth": 1,
            "path": undefined,
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/",
          "/tabs/1",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 0,
            "path": "/",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/tabs/1",
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/tabs/1",
          "/tabs/2",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 2,
            "path": "/tabs/1",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/tabs/2",
            "presentation": "default",
          },
        }
      `)
      expect(
        getTransition(
          "/tabs/1",
          "/users/pick",
          presentationByPath,
          paths,
          NavigationType.Push,
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "from": Object {
            "depth": 2,
            "path": "/tabs/1",
            "presentation": "default",
          },
          "navigationType": "PUSH",
          "to": Object {
            "depth": 2,
            "path": "/users/pick",
            "presentation": "modal",
          },
        }
      `)
    })
  })
})
