import 'package:go_router/go_router.dart';
import 'package:psyco_admin/presentation/screens/login_screen.dart';

final appRouter = GoRouter(
  initialLocation: "/",
  routes: [
    GoRoute(
        path: "/",
        builder: (context, state) {
          return const AuthScreen();
        }),
  ],
);
