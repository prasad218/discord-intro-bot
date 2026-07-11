import config from "../config.js";

const ONE_DAY = 24 * 60 * 60 * 1000;

export async function removeNewMemberRole(client) {

    try {

        console.log("======================================");
        console.log("Running New Member Role Cleanup...");
        console.log("======================================");

        // Check configuration
        if (!config.newMemberRoleId) {
            console.log("❌ NEW_MEMBER_ROLE_ID is not configured.");
            return;
        }

        // Loop through all guilds
        for (const guild of client.guilds.cache.values()) {

            console.log(`Checking Guild: ${guild.name}`);

            // Fetch all members
            await guild.members.fetch();

            // Find configured role
            const role = guild.roles.cache.get(config.newMemberRoleId);

            if (!role) {
                console.log(`❌ Role not found in ${guild.name}`);
                continue;
            }

            // Check every member
            for (const member of guild.members.cache.values()) {

                // Ignore bots
                if (member.user.bot) continue;

                // Ignore users without the role
                if (!member.roles.cache.has(role.id)) continue;

                // Ignore if joinedAt is unavailable
                if (!member.joinedAt) continue;

                const daysInServer = Math.floor(
                    (Date.now() - member.joinedAt.getTime()) / ONE_DAY
                );

                // Remove role if member has been in server long enough
                if (daysInServer >= config.newMemberDays) {

                    try {

                        await member.roles.remove(role);

                        console.log(
                            `✅ Removed '${role.name}' from ${member.user.tag} (${daysInServer} days)`
                        );

                    } catch (err) {

                        console.error(
                            `❌ Failed to remove role from ${member.user.tag}:`,
                            err.message
                        );

                    }

                }

            }

        }

        console.log("======================================");
        console.log("Role Cleanup Finished.");
        console.log("======================================");

    } catch (error) {

        console.error("Role Cleanup Error:", error);

    }

} 