import 'package:go_router/go_router.dart';

import '../../presentation/screens/screens.dart';

final appRouter = GoRouter(
  initialLocation: "/auth",
  routes: [
    GoRoute(
        path: "/auth",
        name: AuthScreen.name,
        builder: (context, state) {
          return const AuthScreen();
        }),
    GoRoute(
      path: "/home",
      name: HomeScreen.name,
      builder: (context, state) {
        return const HomeScreen();
      },
    )
  ],
);
