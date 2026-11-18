-- Only the two confirmed projects; descriptions are left empty on purpose (edit them in the admin area later).
insert into public.profile (id, full_name_ar, full_name_en) values (1, 'سامح أبوبكر', 'Sameh Abobakr') on conflict do nothing;
insert into public.projects (slug, title_en, title_ar, github_url, is_published, sort_order) values
 ('agricultural-engineering-platform', 'Agricultural Engineering Educational Platform', 'منصة تعليمية للهندسة الزراعية', 'https://github.com/SamehAbobakr/Agricultural-Engineering-platform', true, 1),
 ('soc-journey', 'SOC Journey', 'رحلة الـ SOC', 'https://github.com/SamehAbobakr/soc-journey-90days', true, 2)
on conflict (slug) do nothing;
-- To make yourself admin (after creating your Auth user):
--   insert into public.admin_users (user_id) values ('<your-auth-user-uuid>');
