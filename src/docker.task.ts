/**
 Task - imagine that Docker does not exist, and as a developer, you need to implement Docker from scratch.
 Describe, at the pseudocode or high-level algorithm level, the implementation of the feature for creating and running a container.
 Also, specify the operating system API required to implement such a feature.
 Do not include handling all possible exceptional situations.

 Pseudofunctions should have names corresponding to existing Unix commands (tar, rm, touch),
 or system call invocations (cgroups cpuset 1),
 or simply describe actions on operating system entities (mount the /olddir directory into /newdir).
**/

const MS_BIND = 0, MS_REC = 0, MS_PRIVATE = 0;

function tar(imagePath: string, containerRootPath: string): void {
    //tar xvf $imagePath -C containerRootPath;
}

function mount(source: string, target: string, filesystemtype: string, mountflags: number) {
    // mount $source $target -t $filesystemtype -o -$mountflags
}

function unshare(namespace: string) {
    // unshare $namespace
}

function exec(cmd: string) {
    // exec $cmd
}

function chroot(root: string) {
    // chroot $root
}

function setns(fd: string, nstype: string) {
    // nsenter -t $fd -$nstype
}

function cgroups(group: string, limit: string) {
    // echo $limit > /sys/fs/cgroup/$group
}

function setgroups(pid: number, group: string) {
    // echo $pid > /sys/fs/cgroup/$group/tasks
}

function getpid(): number {
    // echo $$
    return 0;
}

const bootstrap = () => {
    // Unpack the container image to the root directory of the container
    tar("/path/image.tar", "/path/container");

    // Create new namespaces
    unshare('CLONE_NEWUTS');
    unshare('CLONE_NEWPID');
    setns('/proc/self/ns/net', 'CLONE_NEWNET');

    // Create groups for memory and number of cores limits
    cgroups("memory", "1024"); // Ограничить память до 500MB
    cgroups("cpuset/cpuset.cpus", "0-1"); // Ограничить до 2-х ядер


    // Set this groups
    setgroups(getpid(), "memory");
    setgroups(getpid(), "cpuset");

    // Bind container root directory
    mount('none', '/path/container', '', MS_BIND | MS_REC);

    // Change root directory for current process
    chroot('/path/container');

    // Bind temporary then permanent virtual file system
    mount('none', '/', 'tmpfs', MS_REC | MS_PRIVATE);
    mount('none', '/proc', 'proc', 0);

    exec("/bin/sh");
};

bootstrap();


