> I like to think about reducers as the heart of the application. If you develop feature-rich, non-trivial systems, a big part of the complexity will end up here. If you introduce a bug, it’s likely to be hard to track down later. That’s why it’s so important to test reducers. The application we’re building is very simple, but I hope you get the picture.

from : https://blog.pragmatists.com/genuine-guide-to-testing-react-redux-applications-6f3265c11f63

1. Every reducer is invoked at the start of the app, hence the need for an initial state. Leaving your state undefined will make you write pesky, defensive checks in components.
